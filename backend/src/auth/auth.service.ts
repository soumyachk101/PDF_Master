import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PlanType, SubscriptionStatus } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const passwordHash = await bcrypt.hash(registerDto.password, 12);

        const user = await this.prisma.user.create({
            data: {
                email: registerDto.email,
                passwordHash,
                name: registerDto.name,
                subscription: {
                    create: {
                        plan: PlanType.FREE,
                        status: SubscriptionStatus.ACTIVE,
                    },
                },
            },
        });

        return this.generateTokens(user.id, user.email, 'FREE');
    }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email },
            include: { subscription: true }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const plan = user.subscription?.plan || 'FREE';
        return this.generateTokens(user.id, user.email, plan);
    }

    private async generateTokens(userId: string, email: string, tier: string) {
        const payload = { sub: userId, email, tier };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload as any, {
                secret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'secret',
                expiresIn: (process.env.JWT_ACCESS_EXPIRY || '15m') as any,
            }),
            this.jwtService.signAsync(payload as any, {
                secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'secret',
                expiresIn: (process.env.JWT_REFRESH_EXPIRY || '7d') as any,
            }),
        ]);

        // Store refresh token logic would go here

        return {
            accessToken,
            refreshToken,
            user: {
                id: userId,
                email,
                tier
            }
        };
    }
}
