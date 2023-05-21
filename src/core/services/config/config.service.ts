
import { injectable } from 'inversify';
import { ConfigInterface } from './config.interface.js';
import convict from 'convict';
import { ConfigSchema, configSchema } from './config.schema.js';


@injectable()
export class ConfigService implements ConfigInterface {
  private cofigSchema: convict.Config<ConfigSchema>;

  constructor(){
    this.cofigSchema = configSchema;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public get(key: keyof ConfigSchema): ConfigSchema[keyof ConfigSchema]{
    const result = this.cofigSchema.get(key);

    return result;
  }
}
