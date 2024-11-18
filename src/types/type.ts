/* eslint-disable  @typescript-eslint/no-explicit-any */
export type ValueOf<T> = T extends any[] ? T[number] : T[keyof T];
