
let init = false

type LogEntry = {
  level: string;
  args: any[];
}

export function interceptLogging() {

  if (init) {
    return;
  }

  // Store original methods to restore later
  const originalConsoleLog = console.log;
  const originalConsoleInfo = console.info;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  // Override console methods
  console.log = (...args) => {
    originalConsoleLog(...args);
    captureLog('log', args);
  };

  console.info = (...args) => {
    originalConsoleInfo(...args);
    captureLog('info', args);
  };

  console.warn = (...args) => {
    originalConsoleWarn(...args);
    captureLog('warn', args);
  };

  console.error = (...args) => {
    originalConsoleError(...args);
    captureLog('error', args);
  };

  init = true

}

let logEntries: LogEntry[] = [];

const MAX_SIZE = 500

// Function to forward logs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export
const captureLog = (level: string, args: any[]) => {
  logEntries.push({ level, args });
  logEntries.splice(0, logEntries.length - MAX_SIZE);
};

export function getLogEntries() {
  return logEntries;
}
