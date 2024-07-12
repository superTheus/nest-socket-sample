import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('add')
  async signupUser(
    @Body() userData: { name: string; email: string, password: string},
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
  
  @Get('list')
  async findAllUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Get('list/:id')
  async findUserById(@Param() params: any): Promise<UserModel> {
    const data = {
      id: Number(params.id),
    }

    return this.userService.user(data);
  }

  @Put('update/:id')
  async updateUserById(@Param() params: any, @Body() userData: { name: string; email: string, password: string}): Promise<UserModel> {
    const data = {
      id: Number(params.id),
    }

    return this.userService.updateUser({
      where: data,
      data: userData,
    });
  }

  @Delete('delete/:id')
  async deleteUserById(@Param() params: any): Promise<UserModel> {
    const data = {
      id: Number(params.id),
    }

    return this.userService.deleteUser(data);
  }

  @Post('login')
  async login(@Body() userData: {email: string, password: string}): Promise<UserModel> {
    return this.userService.user(userData);
  }
} 
