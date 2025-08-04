import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Power {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int', nullable: false })
  out1: number

  @Column({ type: 'int', nullable: false })
  out2: number

  @Column({ type: 'int', nullable: false })
  out3: number

  @Column({ type: 'int', nullable: false })
  out4: number

  @Column({ type: 'int', nullable: false })
  out5: number

  @Column({ type: 'int', nullable: false })
  out6: number

  @Column()
  ip: string

  @CreateDateColumn()
  createdAt: Date
}
