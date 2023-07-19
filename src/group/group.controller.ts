import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from '@prisma/client';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: Group) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Group) {
    return this.groupService.update(data);
  }

  @Delete(':id')
  remove(@Param('id') data: Group) {
    return this.groupService.remove(data);
  }
}
