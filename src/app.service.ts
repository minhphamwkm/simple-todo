import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Landing Page/Welcome Page/Login Page will show here';
  }
}
