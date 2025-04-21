import { CronJob } from 'cron';
import { writeFile } from 'fs/promises';

const LOG_PATHS = [
  './logs/combined.log',
  './logs/error.log',
];

export function logCleaner(): void {
  new CronJob(
    '50 * * * * *',
    () => {
      console.log('[⚠️  WARNING] Logs will be deleted in 10 seconds!');
    },
    null,
    true
  );

  new CronJob(
    '0 * * * * *',
    async () => {
      try {
        await Promise.all(LOG_PATHS.map(path => writeFile(path, '')));
        console.log('[✅ INFO] Logs cleared.');
      } catch (err) {
        console.error('[❌ ERROR] Failed to clear logs:', (err as Error).message);
      }
    },
    null,
    true
  );
}
