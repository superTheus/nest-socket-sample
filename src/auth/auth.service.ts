import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/types/interfaces';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userData: {
    email: string;
    password: string;
  }): Promise<any> {
    const user: UserInterface = await this.usersService.user(userData);
    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
    if (user.password === userData.password) {
      return await this.getToken(user);
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async getToken(user: UserInterface) {
    user.token = this.jwtService.sign(
      { email: user.email },
      {
        secret: 'topSecret512',
        expiresIn: '50s',
      },
    );

    return user;
  }
}
