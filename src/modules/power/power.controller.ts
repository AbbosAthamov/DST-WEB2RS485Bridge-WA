import { Controller, Get, Post, Req } from '@nestjs/common'
import { PowerService } from './power.service'
import { Input } from './power.entity'
import { Output } from './power.entity'
import * as moment from 'moment'
import { Stats } from 'fs'

@Controller('/power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Get()
  async getStatus(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip, req.query)
    return this.powerService.getStatus()
  }

  

  @Get('/always-long')
  async getStatusAlwaysLong(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip, req.query)
    return this.powerService.getStatusAlwaysLong()
  }

  @Post('/always-long')
  async postStatusAlwaysLong(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip, req.body)
    return this.powerService.getStatusAlwaysLong()
  }

  @Get('/getdb')
  async getAllFromDb(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip)
    const data = await this.powerService.getAll()
    return { count: data.length, data }
  }

  @Get('/outputs')
  async getLatestPorts(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip)
    return this.powerService.getLatestOutputs()
  }

  @Get('/inputs')
  async getLatestInputs(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip)
    return this.powerService.getLatestInputs()
  }

  @Post('/outputs')
  async postOutputs(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip, req.body)

    const data: Partial<Output> = {
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
    return { status: 'OK' }
  }

  @Post('/inputs')
  async postInputs(@Req() req): Promise<object> {
    console.log(moment().utcOffset('+0500'), req.path, req.method, req.ip, req.body)

    const data: Partial<Input> = {
      ip: req.ip,
    }

    const inputPorts = req.body.InputPorts
    if (inputPorts && typeof inputPorts === 'object') {
      for (let i = 1; i <= 6; i++) {
        const value = inputPorts[String(i)]
        if (typeof value !== 'undefined') {
          data[`in${i}`] = value
        }
      }
    }

    await this.powerService.saveInputs(data)
    return { status: 'OK' }
  }
}
