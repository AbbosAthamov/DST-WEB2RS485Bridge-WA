import { Controller, Post } from '@nestjs/common'
import { PowerService } from './power.service'

@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Post()
  getStatus(): object {
    return this.powerService.getStatus()
  }
}
