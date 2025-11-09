import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { PrismaService } from "../../prisma/prisma.service"
import { UsersModule } from "../users/users.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { JwtAccessStrategy } from "./strategy/jwt-access.strategy"
import { JwtRefreshStrategy } from "./strategy/jwt-refresh.strategy"
import { JwtStrategy } from "./strategy/jwt.strategy"

@Module({
	imports: [UsersModule, PassportModule, JwtModule.register({})],
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtStrategy,
		PrismaService,
		JwtRefreshStrategy,
		JwtAccessStrategy
	]
})
export class AuthModule {}
