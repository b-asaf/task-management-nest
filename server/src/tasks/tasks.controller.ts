import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  // 'TasksController' - makes life easy to identify from where the log came from
  private logger = new Logger('TasksController');

  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `user ${user.username} retrieving all tasks. filters: ${JSON.stringify(filterDto)}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(
      `user ${user.username} try to find task with id = ${id}`,
    );
    return this.tasksService.getTaskById(id, user);
  }

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

  // // Option C
  // // [Good!!!] - Use Dto class instead
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User, // get user using the custom decorator
  ): Promise<Task> {
    this.logger.verbose(
      `user ${user.username} create task ${JSON.stringify(createTaskDto)}`,
    );
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    this.logger.verbose(
      `user ${user.username} tries to delete task with id = ${id}`,
    );
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    // At this point the params were validated successfully by the validation pipe, this Dto can be used.
    const { status } = updateTaskStatusDto;

    this.logger.verbose(
      `user ${user.username} tries to update status of task id = ${id}, new status is ${status}`,
    );
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
