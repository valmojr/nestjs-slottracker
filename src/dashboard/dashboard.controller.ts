import { Controller, Get, HttpStatus, Req } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  @Get()
  async getDashboard(@Req() req: any) {
    console.log(req.session.passport);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: req.session?.passport?.user,
    };
  }
}
