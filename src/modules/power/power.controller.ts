import { Controller, Get, Post, Req } from '@nestjs/common'
import { PowerService } from './power.service'
import { Power } from './power.entity'
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

  @Get('/getdb')
  async getAllFromDb(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip)
    const data = await this.powerService.getAll()
    return { count: data.length, data }
  }

  @Post()
  async getStatusPost(@Req() req): Promise<object> {
    console.log(req.body)
    const data: Partial<Power> = {
      ip: req.ip,
    }

    const outputPorts = req.body.OutputPorts
    if (outputPorts && typeof outputPorts === 'object') {
      for (let i = 1; i <= 6; i++) {
        const value = outputPorts[String(i)]
        if (typeof value !== 'undefined') {
          data[`out${i}`] = value
        }
      }
    }

    await this.powerService.saveOutpusts(data)
    return this.powerService.getStatus()
  }
}
