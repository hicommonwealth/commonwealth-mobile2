import {captureLog, getLogEntries} from "@/util/interceptLogging";

describe('interceptLogging', () => {
  it('basic', () => {
    captureLog('info', ['hello world: 0'])
    captureLog('info', ['hello world: 1'])
    captureLog('info', ['hello world: 2'])
    console.log(getLogEntries())
  });
})
