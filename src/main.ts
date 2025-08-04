import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // Указываем директорию для статики
  app.useStaticAssets(join(__dirname, '..', 'public'))

  await app.listen(3000)
}

bootstrap()