import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PowerModule } from '../power/power.module'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { Power } from './power.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'loginDB',
      password: 'B.Server2010',
      database: 'testDB',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PowerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
