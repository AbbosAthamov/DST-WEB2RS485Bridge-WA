import { Injectable } from '@nestjs/common'
import randomRange from '../../common/utils/randomRange'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Output } from './power.entity'
import { Input } from './power.entity'

@Injectable()
export class PowerService {

  constructor(
    @InjectRepository(Output)
    private outputRepository: Repository<Output>,

    @InjectRepository(Input)
    private inputRepository: Repository<Input>,
  ) {}


  async saveInputs(data: Partial<Input>): Promise<void> {
    const entity = this.inputRepository.create(data)
    await this.inputRepository.save(entity)
  }

  async getLatestInputs(): Promise<object> {
    const [latest] = await this.inputRepository.find({
      order: { id: 'DESC' },
      take: 1,
    })

    if (!latest) return { InputPorts: {} }

    const InputPorts: Record<string, number> = {}

    for (let i = 1; i <= 6; i++) {
      const key = `in${i}` as keyof Input
      const value = latest[key]
      if (typeof value === 'number') {
        InputPorts[String(i)] = value
      }
    }

    return { InputPorts }
  }

  async saveOutpusts(data: Partial<Output>): Promise<void> {
    const entity = this.outputRepository.create(data)
    await this.outputRepository.save(entity)
  }

  async getLatestOutputs(): Promise<object> {
    const [latest] = await this.outputRepository.find({
      order: { id: 'DESC' },
      take: 1,
    })

    if (!latest) return { OutputPorts: {} }

    const OutputPorts: Record<string, number> = {}

    for (let i = 1; i <= 6; i++) {
      const key = `out${i}` as keyof Output
      const value = latest[key]
      if (typeof value === 'number') {
        OutputPorts[String(i)] = value
      }
    }

    return { OutputPorts }
  }


  async getAll(): Promise<Input[]> {
    return this.inputRepository.find({
      order: { id: 'DESC' },
    })
  }

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async getStatus(): Promise<object> {
    const num = randomRange(1, 100)
    if (num > 90) {
      await this.delay(10_000)
      return { status: 'ON' }
    } else if (num > 10) {
      await this.delay(num * 100)
      return { status: num > 55 ? 'ON' : 'OFF' }
    }

    return { status: num > 5 ? 'ON' : 'OFF' }
  }

  async getStatusAlwaysLong(): Promise<object> {
    const num = randomRange(1, 100)
    await this.delay(60_000)

    return { status: num > 50 ? 'ON' : 'OFF' }
  }
}
