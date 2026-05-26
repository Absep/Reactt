import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(user: {
    email: string;
    password: string;
  }) {

    const hashedPassword =
      await bcrypt.hash(
        user.password,
        10
      )

    return this.prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword
      }
    })
  }
  async login(user: {
  email: string;
  password: string;
}) {

  const foundUser =
    await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

  if (!foundUser) {
    return {
      message: 'User not found',
    };
  }

  const isPasswordCorrect =
    await bcrypt.compare(
      user.password,
      foundUser.password,
    );

  if (!isPasswordCorrect) {
    return {
      message: 'Wrong password',
    };
  }

  const token =
    this.jwtService.sign({
      id: foundUser.id,
      email: foundUser.email,
    });

  return {
    access_token: token,
  };
}
}