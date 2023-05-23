
//import { ConsoleLogger } from '../../logger/console-logger.js';
import { ConsoleLogger } from '../../logger/console-logger.js';
import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { getErrorMessage } from '../helpers/common.js';
import { createOffer } from '../helpers/offers.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name;

  constructor(){
    this.name = '--import';
  }

  private onLine(line: string) {
    const offer = createOffer(line);
    new ConsoleLogger().log(offer);
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
  }

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
