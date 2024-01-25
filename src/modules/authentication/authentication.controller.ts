import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationService.create(createAuthenticationDto);
  }

  @Get('retrieve/all')
  findAll(@Param('size') size: string, @Param('page') page: string) {
    if (typeof size != 'number' || typeof page != 'number') {
      return;
    }
    return this.authenticationService.findAll(page, size);
  }

  @Get('retrieve/:id')
  findOne(@Param('id') id: string) {
    return this.authenticationService.findOne(id);
  }

  @Patch('update')
  update(@Body() updateAuthenticationDto: UpdateAuthenticationDto) {
    return this.authenticationService.update(updateAuthenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }
}
