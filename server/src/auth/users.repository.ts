import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';

import { DUPLICATE_USERNAME_CODE } from './constant';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { User } from './user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    // Problems when only encrypt the password using hash function:
    // 1. Duplicate passwords will have the same hash result
    // 2. If DB is breached, the password can "easily" engineer backward using simple/online tables
    // The way to solve above problems is by using 'salt', this way the generated password will be unique

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (err) {
      if (err.code === DUPLICATE_USERNAME_CODE) {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
