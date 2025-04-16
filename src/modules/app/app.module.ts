import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PowerModule } from '../power/power.module'

@Module({
  imports: [PowerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
