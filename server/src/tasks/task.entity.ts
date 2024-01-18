import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

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
  // When the response is printed as plain text, this information will be excluded from the response
  @Exclude({ toPlainOnly: true })
  user: User;
}
