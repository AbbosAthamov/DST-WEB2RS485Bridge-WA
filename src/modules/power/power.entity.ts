import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Power {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  out1: number

  @Column()
  out2: number

  @Column()
  out3: number

  @Column()
  out4: number

  @Column()
  out5: number

  @Column()
  out6: number

  @Column()
  ip: string

  @CreateDateColumn()
  createdAt: Date
}
