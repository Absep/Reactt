import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {

  constructor(
    private prisma: PrismaService,
  ) {}

  findAll(
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    status?: string,
    priority?: string,
  ) {

    const skip =
      (page - 1)
      * limit;

    return this.prisma
      .project.findMany({

        where: {

          ...(status && {
            status,
          }),

          ...(priority && {
            priority,
          }),
        },

        orderBy: {
          [sortBy]:
            sortOrder,
        },

        skip,
        take: limit,

        include: {
          tasks: true,
        },
      });
  }

  findOne(id: number) {

    return this.prisma.project.findUnique({
      where: {
        id,
      },
    });
  }

  create(project: {
    name: string;
    status: string;
    priority: string;
  }) {

    return this.prisma.project.create({
      data: project,
    });
  }

  update(
    id: number,
    updatedProject: {
      name?: string;
      status?: string;
      priority?: string;
    },
  ) {

    return this.prisma.project.update({
      where: {
        id,
      },

      data: updatedProject,
    });
  }

  remove(id: number) {

    return this.prisma.project.delete({
      where: {
        id,
      },
    });
  }
}