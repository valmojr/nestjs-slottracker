import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async getDashboard(): Promise<string> {
    return 'This action returns a dashboard';
  }
}
