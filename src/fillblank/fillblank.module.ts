import { Module } from '@nestjs/common';
import { FillblankController } from './fillblank.controller';
import { FillblankService } from './fillblank.service';
import { DatabaseModule } from '../database/database.module';
import { fillblankProviders } from './fillblank.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [FillblankController],
  providers: [FillblankService, ...fillblankProviders],
})
export class FillblankModule {}
