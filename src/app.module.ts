import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
const dotenv = require("dotenv");
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
