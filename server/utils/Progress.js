const store = new Map();

export const initProgress = (jobId) => {
      store.set(jobId, { phase: "init", percent: 0, detail: "" });
}

export const setProgress = (jobId, data) => {
      const prev = store.get(jobId) || {};
      store.set(jobId, { ...prev, ...data });
}

export const getProgress = (jobId) => {
      return store.get(jobId) || { phase: "unknown", percent: 0, detail: "" };
}

export const completeProgress = (jobId) => {
      setProgress(jobId, { phase: "done", percent: 100 });
      setTimeout(() => {
            store.delete(jobId);
      }, 10 * 60 * 1000);
}

export const failProgress = (jobId, msg) => {
      setProgress(jobId, { phase: "error", percent: 0, detail: msg || "Failed" });
}