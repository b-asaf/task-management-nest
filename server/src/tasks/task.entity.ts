import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/user.entity';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  // instead of creating id by default as numbers in a sequential order
  // when providing 'uuid', the id's will be generated automatically as unique identifiers
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // i.e. don't fetch the tasks when fetching the user
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
}
