import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { AuditLog } from '../../entities/audit-log.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(AuditLog) private auditRepo: Repository<AuditLog>,
  ) {}

  async ensureUser(email: string, name?: string): Promise<User> {
    let user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      user = this.usersRepo.create({ email, name, plan: 'free' });
      await this.usersRepo.save(user);
      await this.auditRepo.save({ user_id: user.id, type: 'user.created', payload: { email } });
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updatePlan(id: string, plan: User['plan']): Promise<User> {
    const user = await this.findById(id);
    user.plan = plan;
    await this.usersRepo.save(user);
    await this.auditRepo.save({ user_id: id, type: 'billing.plan_updated', payload: { plan } });
    return user;
  }
}
