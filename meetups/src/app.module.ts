import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MeetupModule } from './meetup/meetup.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, MeetupModule, AuthModule, PrismaModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
