import { EntityRepository, Repository } from 'typeorm';
import { SystemUsers } from '../entities/system-users.entity';

@EntityRepository(SystemUsers)
export class SystemUsersRepository extends Repository<SystemUsers> {
  async FindByEmail(email: string): Promise<SystemUsers | null> {
    return this.findOne({
      where: {
        email,
      },
    });
  }
}
