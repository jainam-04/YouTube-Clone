import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
      endpoint: process.env.STORJ_ENDPOINT,
      region: "us-east-1",
      credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY_ID
      }
});

const signedUrlExpiry = 60 * 60 * 24 * 7;

const listAllFiles = (dir) => {
      const out = [];
      const walk = (d) => {
            for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
                  const p = path.join(d, entry.name);
                  if (entry.isDirectory()) {
                        walk(p);
                  }
                  else {
                        out.push(p);
                  }
            }
      };
      walk(dir);
      return out;
}

export const uploadFolderToStorj = async (localDir, bucketName, prefix = "", onProgress = () => { }) => {
      try {
            const signedUrlMap = {};
            const allFiles = listAllFiles(localDir);
            const totalFiles = allFiles.length;
            let uploaded = 0;
            const bump = () => {
                  uploaded += 1;
                  onProgress(uploaded, totalFiles);
            };
            async function walkAndUpload(dir, keyPrefix) {
                  const files = fs.readdirSync(dir, { withFileTypes: true });
                  for (const file of files) {
                        const localPath = path.join(dir, file.name);
                        const destKey = path.join(keyPrefix, file.name).replace(/\\/g, "/");
                        if (file.isDirectory()) {
                              await walkAndUpload(localPath, destKey);
                        }
                        else {
                              const fileBuffer = fs.readFileSync(localPath);
                              await s3Client.send(new PutObjectCommand({
                                    Bucket: bucketName,
                                    Key: destKey,
                                    Body: fileBuffer
                              }));
                              const command = new GetObjectCommand({
                                    Bucket: bucketName,
                                    Key: destKey
                              });
                              const signedUrl = await getSignedUrl(s3Client, command, {
                                    expiresIn: signedUrlExpiry
                              });
                              signedUrlMap[destKey] = signedUrl;
                              bump();
                        }
                  }
            }
            await walkAndUpload(localDir, prefix);
            const m3u8Keys = Object.keys(signedUrlMap).filter((k) => k.endsWith(".m3u8"));
            const rewriteTotal = m3u8Keys.length || 1;
            let rewritten = 0;
            for (const key of m3u8Keys) {
                  const relativePath = key.replace(prefix, "");
                  const localPath = path.join(localDir, relativePath);
                  if (!fs.existsSync(localPath)) {
                        continue;
                  }
                  let content = fs.readFileSync(localPath, "utf-8");
                  content = content.replace(/(stream_\d+\/playlist\.m3u8|[^#\s]+\.ts)/g, (match) => {
                        const resolvedKey = path.join(path.dirname(key), match).replace(/\\/g, "/");
                        return signedUrlMap[resolvedKey] || match;
                  });
                  await s3Client.send(new PutObjectCommand({
                        Bucket: bucketName,
                        Key: key,
                        Body: Buffer.from(content, "utf-8")
                  }));
                  rewritten += 1;
                  onProgress(totalFiles + rewritten, totalFiles + rewriteTotal);
            }
            const masterKey = Object.keys(signedUrlMap).find((k) => k.endsWith("master.m3u8"));
            return masterKey ? signedUrlMap[masterKey] : null;
      } catch (error) {
            console.log("Error in uploadFolderToStorj: ", error);
            return null;
      }
}