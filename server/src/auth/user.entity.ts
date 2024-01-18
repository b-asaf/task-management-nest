import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // OneToMany decorator - the relation between 1 user and many Tasks
  // 1st property - `_type`: defining the type of the property, but because it is not used adding a prefix of _ to the type
  // 2nd property - `task`: how to access the User entity from the Task entity (i.e. the other side of the relationship)
  // 3rd property - `Object` with eager property:
  // - eager: true: if we want to fetch the data that is related the current instance
  // - eager: false: if we don't want to fetch the data that is related the current instance
  // Only one of the sides can be true, if both sides are set to true, we will have "Circular eager relations"
  // i.e. fetch the tasks when fetching the user
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
