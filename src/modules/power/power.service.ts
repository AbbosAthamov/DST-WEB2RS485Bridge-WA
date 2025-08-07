import { Injectable } from '@nestjs/common'
import randomRange from '../../common/utils/randomRange'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Power } from './power.entity'

@Injectable()
export class PowerService {

  constructor(
    @InjectRepository(Power)
    private powerRepository: Repository<Power>,
  ) {}

  async saveOutpusts(data: Partial<Power>): Promise<void> {
    const entity = this.powerRepository.create(data)
    await this.powerRepository.save(entity)
  }

  async getLatestPorts(): Promise<object> {
    const [latest] = await this.powerRepository.find({
      order: { id: 'DESC' },
      take: 1,
    })

    if (!latest) return { OutputPorts: {} }

    const OutputPorts: Record<string, number> = {}

    for (let i = 1; i <= 6; i++) {
      const key = `out${i}` as keyof Power
      const value = latest[key]
      if (typeof value === 'number') {
        OutputPorts[String(i)] = value
      }
    }

    return { OutputPorts }
  }


  async getAll(): Promise<Power[]> {
    return this.powerRepository.find({
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
