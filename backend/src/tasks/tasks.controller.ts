import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { TasksService } from './tasks.service';

@Controller('projects/:projectId/tasks')
export class TasksController {

  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Get()
  findAll(
    @Param('projectId')
    projectId: string,
  ) {

    return this.tasksService.findAll(
      +projectId,
    );
  }

  @Post()
  create(
    @Param('projectId')
    projectId: string,

    @Body()
    task: {
      name: string;
    },
  ) {

    return this.tasksService.create({
      ...task,
      projectId: +projectId,
    });
  }

  @Patch(':taskId')
  toggleComplete(
    @Param('taskId')
    taskId: string,
  ) {

    return this.tasksService
      .toggleComplete(+taskId);
  }

  @Delete(':taskId')
  remove(
    @Param('taskId')
    taskId: string,
  ) {

    return this.tasksService.remove(
      +taskId,
    );
  }
}