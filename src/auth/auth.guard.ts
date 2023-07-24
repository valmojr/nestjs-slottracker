import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('items')
export class ItemsController {
  // Public route, accessible without authentication
  @Get()
  async getItems() {
    // Your existing logic to retrieve items from the database
  }

  // Private route, requires authentication
  @Get('protected')
  @UseGuards(AuthGuard('discord'))
  async getProtectedItems() {
    // Your logic for protected items, accessible only to authenticated users
  }
}
