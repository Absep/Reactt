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

import { ProjectsService }
from './projects.service';

import { Roles }
from '../auth/roles.decorator';

import { RolesGuard }
from '../auth/roles.guard';

@Controller('projects')
@UseGuards(
  AuthGuard('jwt')
)
export class ProjectsController {

  constructor(
    private readonly projectsService:
    ProjectsService,
  ) {}

  @Get()
findAll(

  @Query('page')
  page = '1',

  @Query('limit')
  limit = '5',

) {

  return this.projectsService
    .findAll(
      +page,
      +limit,
    );
}

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {

    return this.projectsService
      .findOne(+id);
  }

  @UseGuards(
    RolesGuard
  )
  @Roles('ADMIN')
  @Post()
  create(

    @Body()
    project: {
      name: string;
      status: string;
      priority: string;
    },

  ) {

    return this.projectsService
      .create(project);
  }

  @UseGuards(
    RolesGuard
  )
  @Roles('ADMIN')
  @Patch(':id')
  update(

    @Param('id')
    id: string,

    @Body()
    updatedProject: {
      name?: string;
      status?: string;
      priority?: string;
    },

  ) {

    return this.projectsService
      .update(
        +id,
        updatedProject,
      );
  }

  @UseGuards(
    RolesGuard
  )
  @Roles('ADMIN')
  @Delete(':id')
  delete(

    @Param('id')
    id: string,

  ) {

    return this.projectsService
      .remove(+id);
  }
}