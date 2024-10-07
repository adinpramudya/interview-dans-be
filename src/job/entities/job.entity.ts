import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  company: string;

  @Column({ nullable: true })
  companyUrl: string;

  @Column()
  location: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  howToApply: string;

  @Column({ nullable: true })
  companyLogo: string;
}
