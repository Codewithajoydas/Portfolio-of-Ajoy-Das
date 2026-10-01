type LogContext = Record<string, unknown>;

class CustomLogger {
  private readonly context: LogContext;
  private readonly enabled: boolean;

  constructor(context: LogContext = {}, enabled = process.env.NODE_ENV !== "production") {
    this.context = context;
    this.enabled = enabled;
  }

  private log(level: "info" | "warn" | "error" | "debug", ...args: unknown[]) {
    if (!this.enabled) return;

    const prefix = Object.keys(this.context).length
      ? `[${JSON.stringify(this.context)}]`
      : "";

    const method = console[level];

    if (prefix) {
      method(prefix, ...args);
      return;
    }

    method(...args);
  }

  info(...args: unknown[]) {
    this.log("info", ...args);
  }

  warn(...args: unknown[]) {
    this.log("warn", ...args);
  }

  error(...args: unknown[]) {
    this.log("error", ...args);
  }

  debug(...args: unknown[]) {
    this.log("debug", ...args);
  }

  child(context: LogContext = {}) {
    return new CustomLogger({ ...this.context, ...context }, this.enabled);
  }
}

export const logger = new CustomLogger();