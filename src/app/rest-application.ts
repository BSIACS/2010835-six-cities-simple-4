import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../core/services/logger/logger.interface';
import { ApplicationComponent } from '../types/application-component.js';
import { ConfigService } from '../core/services/config/config.service.js';

@injectable()
export class RestApplication {

  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(ApplicationComponent.ConfigService) private readonly config: ConfigService,
  ) {}

  public async init(){
    this.logger.info('Application has been initialized');
    this.config.get('PORT');
  }
}
