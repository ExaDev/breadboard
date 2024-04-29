import {
  TaskQueueFunction,
  TaskQueueOptions,
  Request as TaskRequest,
  onTaskDispatched,
} from "firebase-functions/v2/tasks";

export function invokeTaskHandler(): TaskQueueFunction {
  const options: TaskQueueOptions = {
    retryConfig: {
      maxAttempts: 5,
      minBackoffSeconds: 60,
    },
    rateLimits: {
      maxConcurrentDispatches: 6,
    },
  };
  // initializeApp();
  const handler: (request: TaskRequest) => void | Promise<void> = (
    r: TaskRequest
  ): void => {
    console.log(`Task strating at ${new Date().toISOString()}`);
    console.log(`request: ${JSON.stringify(r)}`);
    // sleep for 10 seconds
    const start = Date.now();
    const durationMs = 10000;
    const end = start + durationMs;
    let current = start;
    let lastLog = start;
    while (current < end) {
      current = Date.now();
      if (current - lastLog > 1000) {
        const seconds = Math.floor((current - start) / 1000);
        const percent = ((current - start) / durationMs) * 100;
        console.log(`Task progress: ${seconds}s (${percent.toFixed(2)}%)`);
        lastLog = current;
      }
    }

    console.log(`Task finished at ${new Date().toISOString()}`);
  };
  return onTaskDispatched(options, handler);
}
