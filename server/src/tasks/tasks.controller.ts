import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // http://localhost:3000/tasks
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // http://localhost:3000/tasks/9340293840934
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
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
