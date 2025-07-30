import { NestFactory } from '@nestjs/core';
import { existsSync, unlinkSync } from 'fs';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const dbFile = 'db.sqlite';
  if (existsSync(dbFile)) {
    unlinkSync(dbFile);
  }
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes();

  const appService = app.get(AppService);
  await appService.seed();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
