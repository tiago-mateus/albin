import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async supabaseLogin(payload: { email: string; name?: string }) {
    // Supabase handles auth; we just ensure the profile exists locally
    return this.usersService.ensureUser(payload.email, payload.name);
  }
}
