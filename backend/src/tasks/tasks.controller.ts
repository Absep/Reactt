import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';

import { AuthGuard }
from '@nestjs/passport';

import { TasksService }
from './tasks.service';

@Controller()
export class TasksController {

  constructor(
    private readonly tasksService:
    TasksService,
  ) {}

  @UseGuards(
    AuthGuard('jwt')
  )
  @Get('tasks/all')
  findAllTasks(

    @Query('page')
    page = '1',

    @Query('limit')
    limit = '5',

  ) {

    return this.tasksService
      .findAllTasks(
        +page,
        +limit,
      );
  }

  @UseGuards(
    AuthGuard('jwt')
  )
  @Get(
    'projects/:projectId/tasks'
  )
  findAll(

    @Param('projectId')
    projectId: string,

    @Query('page')
    page = '1',

    @Query('limit')
    limit = '5',

  ) {

    return this.tasksService
      .findAll(
        +projectId,
        +page,
        +limit,
      );
  }

  @UseGuards(
    AuthGuard('jwt')
  )
  @Post(
    'projects/:projectId/tasks'
  )
  create(

    @Param('projectId')
    projectId: string,

    @Body()
    task: {
      name: string;
      priority: string;
    },

  ) {

    return this.tasksService
      .create({
        ...task,
        projectId:
          +projectId,
      });
  }

  @UseGuards(
    AuthGuard('jwt')
  )
  @Patch(
    'projects/:projectId/tasks/:taskId'
  )
  toggleComplete(

    @Param('taskId')
    taskId: string,

  ) {

    return this.tasksService
      .toggleComplete(
        +taskId
      );
  }

  @UseGuards(
    AuthGuard('jwt')
  )
  @Delete(
    'projects/:projectId/tasks/:taskId'
  )
  remove(

    @Param('taskId')
    taskId: string,

  ) {

    return this.tasksService
      .remove(
        +taskId,
      );
  }
}