import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  // // by default methods are 'public'
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((tasks) => tasks.status === status);
  //   }
  //   if (search) {
  //     const _search = search.toLocaleLowerCase();
  //     tasks = tasks.filter((task) => {
  //       if (
  //         task.title.toLocaleLowerCase().includes(_search) ||
  //         task.description.toLocaleLowerCase().includes(_search)
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    // `remove` can be used instead BUT, to use `remove` 2 DB calls are required:
    // 1. fetch the relevant item from DB
    // 2. if successful, remove the item from DB
    // for performance reasons `delete` is used
    const deleteResult = await this.tasksRepository.delete({ id });

    // in the `delete` response, the number of deleted rows is returned, if 0 -> no row was deleted
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
  // // Temp solution, will be removed once data will be stored in DB
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
