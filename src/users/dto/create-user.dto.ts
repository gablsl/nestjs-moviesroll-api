export class CreateUserDto {
  profile_picture?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
