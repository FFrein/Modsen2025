import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MeetupModule } from './meetup/meetup.module';

@Module({
  imports: [UsersModule, MeetupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
