import { Injectable, ConflictException, UnauthorizedException } from "@nestjs/common"
import { hash, verify } from "argon2"
import { User } from "@prisma/client"
import { PrismaService } from "../../prisma/prisma.service"
import { LoginDto } from "./dto/login.dto"
import { RegisterDto } from "./dto/register.dto"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	) {}

	async register(dto: RegisterDto) {
		const existingUser = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})
		if (existingUser) throw new ConflictException("User already exists")

		const hashedPassword = await hash(dto.password)
		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				password: hashedPassword,
				name: dto.name,
				lastName: dto.lastName,
				region: dto.region
			}
		})

		return this.buildResponse(user)
	}

	async login({ email, password }: LoginDto) {
		const user = await this.prisma.user.findUnique({ where: { email } })
		if (!user) throw new UnauthorizedException("Invalid email or password")

		const passwordValid = await verify(user.password, password)
		if (!passwordValid) throw new UnauthorizedException("Invalid email or password")

		return this.buildResponse(user)
	}

	private buildResponse(user: User) {
		const token = this.jwt.sign({
			id: user.id,
			email: user.email
		})

		return {
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				lastName: user.lastName,
				region: user.region
			},
			token
		}
	}
}
