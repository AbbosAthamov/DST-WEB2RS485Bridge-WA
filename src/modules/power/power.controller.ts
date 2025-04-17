import { Controller, Post, Req } from '@nestjs/common'
import { PowerService } from './power.service'

@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Post()
  getStatus(@Req() req): object {
    console.log(req.method, req.ip, req.query)
    return this.powerService.getStatus()
  }
}
