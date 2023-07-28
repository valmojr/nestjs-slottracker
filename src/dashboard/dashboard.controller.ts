import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { Request } from 'express';
@Controller('dashboard')
export class DashboardController {
  @Get()
  async getDashboard(@Req() req: Request) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: req.user,
      cookies: req.cookies,
    };
  }
}
