import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
      try {
            const token = req.headers.authorization.split(" ")[1]
            let decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user_id = decodeData?.id
            next()
      } catch (error) {
            res.status(400).json("Invalid Credentials..")
            return
      }
}

export default auth