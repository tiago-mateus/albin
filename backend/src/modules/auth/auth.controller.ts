import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('supabase')
  supabase(@Body() body: { email: string; name?: string }) {
    return this.authService.supabaseLogin(body);
  }
}
