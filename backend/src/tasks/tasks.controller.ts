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

@Controller()
export class TasksController {

  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Get('tasks/all')
  findAllTasks() {

    return this.tasksService
      .findAllTasks();
  }

  @Get('projects/:projectId/tasks')
  findAll(
    @Param('projectId')
    projectId: string,
  ) {

    return this.tasksService.findAll(
      +projectId,
    );
  }

  @Post('projects/:projectId/tasks')
  create(
    @Param('projectId')
    projectId: string,

    @Body()
    task: {
      name: string;
      priority: string
    },
  ) {

    return this.tasksService.create({
      ...task,
      projectId: +projectId,
    });
  }

  @Patch(
    'projects/:projectId/tasks/:taskId'
  )
  toggleComplete(
    @Param('taskId')
    taskId: string,
  ) {

    return this.tasksService
      .toggleComplete(+taskId);
  }

  @Delete(
    'projects/:projectId/tasks/:taskId'
  )
  remove(
    @Param('taskId')
    taskId: string,
  ) {

    return this.tasksService.remove(
      +taskId,
    );
  }
}