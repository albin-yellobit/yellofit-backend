import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export const ensureLogDirectory = (): void => {
  const logDir = join(process.cwd(), 'logs');
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true });
  }
};
