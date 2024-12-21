import { UsersService } from 'src/users/users.service';
import {
  Controller,
  Delete,
  Param,
  Get,
  Patch,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // !: This method is just for development, IT SHOULD BE REMOVED in production
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.update(id, updateUserDto, file);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
