import { Controller, Get } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  @Get()
  async getDashboard() {
    return {
      message: 'You are logged in!',
    };
  }
}
