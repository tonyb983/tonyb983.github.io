import createLogger from './Logger';

describe('Logger tests', () => {
  it('Can create a logger.', () => {
    const logger = createLogger();

    expect(logger).toBeDefined();
  });

  it('Can create a logger with a prefix.', () => {
    const logger = createLogger('Logger');

    expect(logger).toBeDefined();
    expect(logger.prefix).toBe('Logger');
  });

  it('Can create a logger with a prefix and timestamps.', () => {
    const logger = createLogger('Logger', true);

    expect(logger.prefix).toBe('Logger');
    expect(logger.useTime).toBe(true);
  });

  it('Calls console functions.', () => {
    const originalLog = console.log;
    console.log = jest.fn();
    const originalInfo = console.info;
    console.info = jest.fn();
    const originalWarn = console.warn;
    console.warn = jest.fn();
    const originalError = console.error;
    console.error = jest.fn();

    const logger = createLogger('Logger', true);
    logger.Log('Log Test');
    logger.Info('Info Test');
    logger.Warn('Warn Test');
    logger.Error('Error Test');

    expect(console.log.mock.calls.length).toBe(1);
    const logArg = console.log.mock.calls[0][0];
    expect(logArg).toInclude('Log Test');
    expect(console.info.mock.calls.length).toBe(1);
    expect(console.warn.mock.calls.length).toBe(1);
    expect(console.error.mock.calls.length).toBe(1);

    console.log = originalLog;
    console.info = originalInfo;
    console.warn = originalWarn;
    console.error = originalError;

    console.log(logArg);
  });
});
