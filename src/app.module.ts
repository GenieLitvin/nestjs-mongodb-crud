import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MultipleModule } from './multiple/multiple.module';
import { FillblankModule } from './fillblank/fillblank.module';
import { QuestionModule } from './question/question.module';
import { VideoModule } from './video/video.module';
import { CollectionModule } from './collection/collection.module';
import { AuthGuard } from './auth/auth.guard';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MultipleModule,
    FillblankModule,
    QuestionModule,
    VideoModule,
    CollectionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
