import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  // temp solution till DB will be added
  private tasks = [];

  // by default methods are 'public'
  getAllTasks() {
    return this.tasks;
  }
}
