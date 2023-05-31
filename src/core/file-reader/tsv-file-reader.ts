import { createReadStream } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';
import EventEmitter from 'node:events';

const CHUNK_SIZE = 16384; // 16KB

export default class TSVFileReader extends EventEmitter implements FileReaderInterface {
  public filename: string;

  constructor(filename: string){
    super();
    this.filename = filename;
  }

  public async read(): Promise<void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });


    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);

  }
}
