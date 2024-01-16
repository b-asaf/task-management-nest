import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // // Option A
  // // [BAD!!!] - because the body can contain information that is not needed and validation and cherry pick the relevant information
  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }

  // // Option B
  // // [Better!!!] - NestJS will cherry pick the defined properties inside the body behind the scenes
  // @Post()
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Task {
  //   // console.log('title', title);
  //   // console.log('description', description);
  //   return this.tasksService.createTask(title, description);
  // }

  // // Option C
  // // [Good!!!] - Use Dto class instead
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
