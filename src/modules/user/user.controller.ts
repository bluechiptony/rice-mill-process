import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseMessages } from 'src/constants/messages/response.messages';
import { UserDTO } from 'src/dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private responseMessages: ResponseMessages,
  ) {}

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

  @Post('create')
  async createUser(@Body() userDTO: UserDTO) {
    const user = await this.userService.createUser(userDTO);

    return {
      message: this.responseMessages.Users.USER_CREATED_SUCCESSFULLY,
      data: user,
    };
  }

  @Post('update')
  async updateUser(@Body() userDTO: UserDTO) {
    const user = await this.userService.updateUser(userDTO);
    if (user) {
      return {
        message: this.responseMessages.Users.USER_CREATED_SUCCESSFULLY,
      };
    }
  }

  @Post('sign-up')
  async signUpUser(@Body() userDTO: UserDTO) {
    const user = await this.userService.signUpUser(userDTO);
    if (user) {
      return {
        message: this.responseMessages.Users.USER_CREATED_SUCCESSFULLY,
      };
    }
  }
}
