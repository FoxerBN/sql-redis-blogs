import { format } from "winston";

export const levelFilter = (allowedLevels: string[]) =>
  format((info) => {
    return allowedLevels.includes(info.level) ? info : false;
  })();
