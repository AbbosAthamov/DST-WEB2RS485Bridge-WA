import { Injectable } from '@nestjs/common'
import randomRange from '../../common/utils/randomRange'

@Injectable()
export class PowerService {
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
