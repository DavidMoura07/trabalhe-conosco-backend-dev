import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return 'The documentation can be found ats /docs';
  }
}
