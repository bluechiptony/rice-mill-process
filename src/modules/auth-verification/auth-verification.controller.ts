import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthVerificationService } from './auth-verification.service';
import { CreateAuthVerificationDto } from './dto/create-auth-verification.dto';
import { UpdateAuthVerificationDto } from './dto/update-auth-verification.dto';

@Controller('auth-verification')
export class AuthVerificationController {
  constructor(private readonly authVerificationService: AuthVerificationService) {}

  @Post()
  create(@Body() createAuthVerificationDto: CreateAuthVerificationDto) {
    return this.authVerificationService.create(createAuthVerificationDto);
  }

  @Get()
  findAll() {
    return this.authVerificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authVerificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthVerificationDto: UpdateAuthVerificationDto) {
    return this.authVerificationService.update(+id, updateAuthVerificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authVerificationService.remove(+id);
  }
}
