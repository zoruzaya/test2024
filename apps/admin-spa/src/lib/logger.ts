/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
// import * as Sentry from "sentry-expo";

export const debugLog = (...msg: any[]) =>
  console.debug(`${new Date().toISOString()}:> `, ...msg);

export const sendErrorMessage = (...msg: any[]) => {
  console.trace();
  return console.log(`${new Date().toISOString()}:> `, ...msg);
};

export const sendLogMessage = (...msg: any[]) =>
  // console.trace();
  // Sentry.Native.captureException(msg);
  console.log(`${new Date().toISOString()}:> `, ...msg);
