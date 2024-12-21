export class CreateUserDto {
  profilePicture?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
