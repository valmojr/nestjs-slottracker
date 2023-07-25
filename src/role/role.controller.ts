import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '@prisma/client';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() data: Role) {
    return this.roleService.create(data);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.find(id);
  }

  @Patch()
  update(@Body() data: Role) {
    return this.roleService.update(data);
  }

  @Delete()
  remove(@Body() data: Role) {
    return this.roleService.remove(data);
  }
}
