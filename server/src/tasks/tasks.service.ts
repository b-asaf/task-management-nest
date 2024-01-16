import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  // temp solution till DB will be added
  private tasks: Task[] = [];

  // by default methods are 'public'
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  // Temp solution, will be removed once data will be stored in DB
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);

    if (task) {
      task.status = status;
      return task;
    }

    return null;
  }
}
