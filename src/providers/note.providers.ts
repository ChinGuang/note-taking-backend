import { Provider } from '@nestjs/common';
import { DATA_SOURCE, NOTE_REPOSITORY } from '../utils/constants';
import { DataSource } from 'typeorm';
import { Note } from '../entity/note.entity';

export const noteProviders: Provider[] = [
  {
    provide: NOTE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Note),
    inject: [DATA_SOURCE],
  },
];
