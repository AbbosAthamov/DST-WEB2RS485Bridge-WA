import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../user/user.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10)
    const user = await this.usersService.create({ email, password: hash })
    return { id: user.id, email: user.email }
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Неверный логин или пароль')
    }
    const payload = { sub: user.id, email: user.email }
    return { access_token: this.jwtService.sign(payload) }
  }
}
