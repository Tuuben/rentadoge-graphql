import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsStagingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return process.env.IS_PRODUCTION === 'false';
  }
}
