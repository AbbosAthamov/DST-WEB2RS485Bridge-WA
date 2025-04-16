import { Injectable } from '@nestjs/common'
import randomRange from '../../common/utils/randomRange'

@Injectable()
export class PowerService {
  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async getStatus(): Promise<object> {
    const num = randomRange(0, 100)
    if (num > 30) return { status: 'OFF' }
    await this.delay(10_000)

    return { status: 'ON' }
  }
}
