import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {

  constructor(
    private prisma: PrismaService,
  ) {}

  findAll(
    projectId: number,
    page: number,
    limit: number,
  ) {

    const skip =
      (page - 1)
      * limit;

    return this.prisma.task.findMany({
      where: {
        projectId,
      },

      skip,
      take: limit,
    });
  }

  findAllTasks(
    page: number,
    limit: number,
  ) {

    const skip =
      (page - 1)
      * limit;

    return this.prisma.task.findMany({

      skip,
      take: limit,

      include: {
        project: true,
      },
    });
  }

  create(task: {
    name: string;
    projectId: number;
  }) {

    return this.prisma.task.create({
      data: task,
    });
  }

  remove(id: number) {

    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  toggleComplete(id: number) {

    return this.prisma.task.update({
      where: {
        id,
      },

      data: {
        completed: true,
      },
    });
  }
}