import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
export interface Tokens {
    accessToken: string;
    refreshToken: string;
}
export interface AuthResponse {
    user: Omit<User, 'password' | 'refreshToken'>;
    tokens: Tokens;
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<AuthResponse>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    refreshTokens(user: User): Promise<Tokens>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    getProfile(user: User): Promise<User>;
    private generateTokens;
}
