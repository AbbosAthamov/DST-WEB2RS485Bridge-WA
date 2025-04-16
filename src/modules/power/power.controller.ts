import { Controller, Get } from '@nestjs/common'
import { PowerService } from './power.service'

@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Get()
  getStatus(): object {
    return this.powerService.getStatus()
  }
}
