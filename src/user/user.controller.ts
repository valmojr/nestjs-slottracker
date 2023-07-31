import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/util/discord.guard';

@Controller('user')
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: User) {
    return this.userService.create(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @Patch()
  update(@Body() data: User) {
    return this.userService.update(data);
  }

  @Delete()
  remove(@Body() data: User) {
    return this.userService.remove(data);
  }
}
