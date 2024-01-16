import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  // temp solution till DB will be added
  private tasks: Task[] = [];

  // by default methods are 'public'
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((tasks) => tasks.status === status);
    }

    if (search) {
      const _search = search.toLocaleLowerCase();
      tasks = tasks.filter((task) => {
        if (
          task.title.toLocaleLowerCase().includes(_search) ||
          task.description.toLocaleLowerCase().includes(_search)
        ) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with "${id}" was not found`);
    }

    return found;
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
