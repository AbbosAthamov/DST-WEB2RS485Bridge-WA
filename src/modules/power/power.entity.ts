import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Power {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int', nullable: false, default: 0 })
  out1: number

  @Column({ type: 'int', nullable: false, default: 0 })
  out2: number

  @Column({ type: 'int', nullable: false, default: 0 })
  out3: number

  @Column({ type: 'int', nullable: false, default: 0 })
  out4: number

  @Column({ type: 'int', nullable: false, default: 0 })
  out5: number

  @Column({ type: 'int', nullable: false, default: 0 })
  out6: number

  @Column()
  ip: string

  @CreateDateColumn()
  createdAt: Date
}
