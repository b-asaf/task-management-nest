import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // // http://localhost:3000/tasks
  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   // if retrieving tasks with filters call tasksService.getTasksWithFilters()
  //   // otherwise, call tasksService.getAllTasks
  //   if (Object.keys(filterDto).length > 0) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // // http://localhost:3000/tasks/9340293840934
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // // // Option A
  // // // [BAD!!!] - because the body can contain information that is not needed and validation and cherry pick the relevant information
  // // @Post()
  // // createTask(@Body() body) {
  // //   console.log('body', body);
  // // }

  // // // Option B
  // // // [Better!!!] - NestJS will cherry pick the defined properties inside the body behind the scenes
  // // @Post()
  // // createTask(
  // //   @Body('title') title: string,
  // //   @Body('description') description: string,
  // // ): Task {
  // //   // console.log('title', title);
  // //   // console.log('description', description);
  // //   return this.tasksService.createTask(title, description);
  // // }

  // // // Option C
  // // // [Good!!!] - Use Dto class instead
  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   return this.tasksService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   // At this point the params were validated successfully by the validation pipe, this Dto can be used.
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
