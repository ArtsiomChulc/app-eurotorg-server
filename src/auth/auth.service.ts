import { Injectable, Res } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { User } from "@prisma/client"
import { hash, verify } from "argon2"
import { Response } from "express"
import { PrismaService } from "../../prisma/prisma.service"
import { UsersService } from "../users/users.service"
import { RegisterDto } from "./dto/register.dto"

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private configService: ConfigService,
		private readonly userService: UsersService
	) {}

	async register(
		{ email, password, region, lastName, name }: RegisterDto,
		res: Response
	) {
		const hashedPassword = await hash(password)
		const createdUser = await this.userService.create({
			email,
			region,
			lastName,
			name,
			hashedPassword
		})
		return this.buildResponse(createdUser, res)
	}

	async validateUser(email: string, password: string) {
		const user = await this.userService.getOne({ email })
		if (!user) return null

		const isValidPassword = await verify(user.hashedPassword, password)
		if (!isValidPassword) return null

		return user
	}

	async generateTokens(userId: number, @Res({ passthrough: true }) res: Response) {
		const accessToken = await this.jwt.signAsync(
			{
				userId
			},
			{
				secret: this.configService.getOrThrow("JWT_ACCESS_SECRET"),
				expiresIn: this.configService.getOrThrow("JWT_ACCESS_EXPIRES")
			}
		)

		const refreshToken = await this.jwt.signAsync(
			{
				userId
			},
			{
				secret: this.configService.getOrThrow("JWT_REFRESH_SECRET"),
				expiresIn: this.configService.getOrThrow("JWT_REFRESH_EXPIRES")
			}
		)

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true
		})

		const user = await this.userService.getOne({ id: userId })

		return { user, accessToken }
	}

	private async buildResponse(user: User, res: Response) {
		const { accessToken } = await this.generateTokens(user.id, res)

		return {
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				lastName: user.lastName,
				region: user.region,
				role: user.role
			},
			accessToken
		}
	}
}
