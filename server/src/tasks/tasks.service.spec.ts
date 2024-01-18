import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

// A new mockObject is created for every test, when it is called in beforeEach method
const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
  createTask: jest.fn(),
});

const mockUser: User = {
  id: 'mockId',
  username: 'mockUser',
  password: 'mockPassword',
  tasks: [],
};

describe('TasksService suite', () => {
  let tasksService: TasksService;
  let tasksRepository; // the type of mockTaskRepository

  beforeEach(async () => {
    // initialize **dummy** NestJs module with tasksService & tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  it('tasksService should be defined', async () => {
    expect(tasksService).toBeDefined();
  });

  it('tasksRepository should be defined', async () => {
    expect(tasksRepository).toBeDefined();
  });

  describe('getTasks', () => {
    it('Should return all tasks', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const results = await tasksService.getTasks(null, mockUser);
      expect(results).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('Should return a task by id', async () => {
      const mockTask = {
        title: 'test title',
        description: 'test description',
        id: 'testId',
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('testId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('Should throw an exception when trying to find a non existing task', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('testId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('Should create a task and return a complete Task object', async () => {
      const newCreateTaskDto: CreateTaskDto = {
        title: 'new Task Title',
        description: 'new Task Description',
      };

      const createdTask: Task = {
        id: 'taskId',
        status: TaskStatus.OPEN,
        user: mockUser,
        ...newCreateTaskDto,
      };

      tasksRepository.createTask.mockResolvedValue(createdTask);
      const result = await tasksService.createTask(newCreateTaskDto, mockUser);
      expect(result.status).toEqual(TaskStatus.OPEN);
      expect(result.id).not.toBeUndefined();
    });
  });

  describe('deleteTask', () => {
    it('Show delete task by id', async () => {
      tasksRepository.delete.mockResolvedValue({ affected: 1 });
      expect(tasksService.deleteTask('testId', mockUser)).resolves.not.toThrow(
        NotFoundException,
      );
    });

    it('Should throw an Exception when trying to delete when taskId not found', async () => {
      tasksRepository.delete.mockResolvedValue({ affected: 0 });
      expect(tasksService.deleteTask('testId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateTaskStatus', () => {
    it('Should update task status and return the result', async () => {
      const mockTask = {
        title: 'test title',
        description: 'test description',
        id: 'testId',
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.updateTaskStatus(
        mockTask.id,
        TaskStatus.IN_PROGRESS,
        mockUser,
      );
      expect(result.status).toBe(TaskStatus.IN_PROGRESS);
    });

    it('Show throw an exception when trying to update status of a non existing task', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(
        tasksService.updateTaskStatus('id', TaskStatus.IN_PROGRESS, mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
