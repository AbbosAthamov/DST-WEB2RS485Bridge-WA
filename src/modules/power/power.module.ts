import { Module } from '@nestjs/common'
import { PowerController } from './power.controller'
import { PowerService } from './power.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Input } from './power.entity'
import { Output } from './power.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Input, Output]),
    AuthModule,
  ],
  controllers: [PowerController],
  providers: [PowerService],
})
export class PowerModule {}

