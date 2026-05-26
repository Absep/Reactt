import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectsController {

  constructor(
    private readonly projectsService : ProjectsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.projectsService.findOne(+id);
  }

  @Post()
  create(
    @Body()
    project: {
      name: string;
      status: string;
      priority: string;
    },
  ) {
    return this.projectsService.create(project);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,

    @Body()
    updatedProject: {
      name?: string;
      status?: string;
      priority?: string;
    },
  ) {
    return this.projectsService.update(
      +id,
      updatedProject,
    );
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
  ) {
    return this.projectsService.remove(+id);
  }
}