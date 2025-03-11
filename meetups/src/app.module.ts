import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PasswordService } from './auth/password.service';
import { MeetupModule } from './meetup/meetup.module';
import { PrismaModule } from './prisma/prisma.module';
import { RecordsModule } from './records/records.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

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
