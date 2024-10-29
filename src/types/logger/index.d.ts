declare namespace Logger {
    interface LogInfo {
      level: string;
      message: string;
      timestamp?: string;
      [key: string]: any;
    }
}