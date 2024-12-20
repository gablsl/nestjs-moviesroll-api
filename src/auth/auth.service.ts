import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne(signInDto.email);

    // TODO: Create a custom error for this if
    if (!user) {
      throw new Error('User not found');
    }

    if (!user || !(await bcrypt.compare(signInDto.password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, role: user.role };
    console.log('PAYLOAD', payload);
    return { access_token: this.jwtService.sign(payload) };
  }
}
