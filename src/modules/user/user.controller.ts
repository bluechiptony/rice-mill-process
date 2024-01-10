import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('retrieve/user/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Get('retrieve/all')
  getUsers(
    @Query('page') page: string = '0',
    @Query('size') size: string = '10',
  ) {
    //validate for query params
    return this.userService.getUsers(+page, +size);
  }

  @Get('search')
  searchUsers(@Query('search') search: string) {
    return this.userService.searchUsers(search);
  }
}
