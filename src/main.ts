import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function bootstrap() {

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
