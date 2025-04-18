import { Controller, Get, Post, Req } from '@nestjs/common'
import { PowerService } from './power.service'
import * as moment from 'moment'

@Controller('/power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Get('/always-long')
  async getStatusAlwaysLongGet(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip, req.query)
    return this.powerService.getStatusAlwaysLong()
  }

  @Post('/always-long')
  async getStatusAlwaysLongPost(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip, req.body)
    return this.powerService.getStatusAlwaysLong()
  }

  @Get()
  async getStatusGet(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip, req.query)
    return this.powerService.getStatus()
  }

  @Post()
  async getStatusPost(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip, req.body)
    return this.powerService.getStatus()
  }
}
