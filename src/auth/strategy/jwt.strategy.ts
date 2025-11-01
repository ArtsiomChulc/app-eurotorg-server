import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { PrismaService } from "../../../prisma/prisma.service"
import { JwtPayload } from "../types/jwt-payload.type"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly prisma: PrismaService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // <-- достаёт токен из заголовка Authorization
			ignoreExpiration: false,
			secretOrKey: configService.get<string>("JWT_ACCESS_SECRET") // <-- секрет для подписи токена
		})
	}

	// метод вызывается автоматически при каждом запросе с JWT
	async validate(payload: JwtPayload) {
		// payload — это объект, который мы записали при генерации токена (id, email и т.д.)

		const user = await this.prisma.user.findUnique({
			where: { id: payload.sub }
		})

		if (!user) {
			return null
		}

		// возвращаем данные пользователя — они добавляются в req.user
		return { id: user.id, email: user.email, name: user.name }
	}
}
