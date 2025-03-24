const colorsText = {
  BLACK: '\x1B[30m',
  RED: '\x1B[31m',
  GREEN: '\x1B[32m',
  YELLOW: '\x1B[33m',
  BLUE: '\x1B[34m',
  MAGENTA: '\x1B[35m',
  CYAN: '\x1B[36m',
  WHITE: '\x1B[37m',
  ORANGE: '\x1B[38,5,208m',
  RESET: '\x1B[0m',
};

type ColorsText = keyof typeof colorsText;

const { BLUE, CYAN, GREEN, ORANGE, RED, YELLOW, RESET } = colorsText;

type LogMessageContent = Array<string | Record<string, unknown>>;

export const Logger = {
  log(color: ColorsText, category: string, ...message: LogMessageContent) {
    // eslint-disable-next-line no-console
    console.log(YELLOW, timestamp(), colorsText[color], `[${category}]`, RESET, ...message);
  },

  success(...message: LogMessageContent) {
    // eslint-disable-next-line no-console
    console.log(YELLOW, timestamp(), GREEN, '[SUCCESS]', RESET, ...message);
  },

  info(...message: LogMessageContent) {
    // eslint-disable-next-line no-console
    console.info(YELLOW, timestamp(), BLUE, '[INFO]', RESET, ...message);
  },

  warn(...message: LogMessageContent) {
    console.warn(YELLOW, timestamp(), ORANGE, '[WARN]', RESET, ...message);
  },

  error(...message: LogMessageContent) {
    console.error(YELLOW, timestamp(), RED, '[ERROR]', RESET, ...message);
  },

  debug(...message: LogMessageContent) {
    // eslint-disable-next-line no-console
    console.debug(YELLOW, timestamp(), CYAN, '[DEBUG]', RESET, ...message);
  },
};

function timestamp(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}
