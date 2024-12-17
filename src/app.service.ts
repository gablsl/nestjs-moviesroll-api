import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcomeMessage(): string {
    return 'Welcome to this Movies API, created only for studying purposes';
  }
}
