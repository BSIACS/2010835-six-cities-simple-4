import { ConfigSchema } from './config.schema';

export interface ConfigInterface{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(key: keyof ConfigSchema): ConfigSchema[keyof ConfigSchema];
}

// export interface ConfigInterface<U> {
//   get<T extends keyof U>(key: T): U[T];
// }
