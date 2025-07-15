import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Power {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  val: number

  @Column()
  ip: string

  @CreateDateColumn()
  createdAt: Date
}
