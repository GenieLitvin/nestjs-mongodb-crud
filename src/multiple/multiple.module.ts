import { Module } from '@nestjs/common';
import { MultipleController } from './multiple.controller';
import { MultipleService } from './multiple.service';
import { multipleProviders } from './multiple.providers';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [MultipleController],
  providers: [MultipleService, ...multipleProviders],
})
export class MultipleModule {}
