import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MeetupModule } from './meetup/meetup.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PasswordService } from './auth/password.service';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [
    UsersModule,
    MeetupModule,
    AuthModule,
    PrismaModule,
    TagsModule,
    RecordsModule,
  ],
  controllers: [AppController],
  providers: [UsersService, PasswordService],
})
export class AppModule {}
