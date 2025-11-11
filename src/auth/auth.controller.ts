import {
	Controller,
	Post,
	Body,
	Res,
	UseGuards,
	ParseIntPipe,
	HttpStatus,
	HttpCode
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Response } from "express"
import { CurrentUser } from "../utils/decorators/current-user.decorator"
import { AuthService } from "./auth.service"
import { RegisterDto } from "./dto/register.dto"

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
		return this.authService.register(dto, res)
	}

	@UseGuards(AuthGuard("local"))
	@Post("login")
	async login(
		@CurrentUser("id", ParseIntPipe) userId: number,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.generateTokens(userId, res)
	}

	@UseGuards(AuthGuard("jwt-refresh"))
	@Post("refresh")
	async refresh(
		@CurrentUser("id", ParseIntPipe) userId: number,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.generateTokens(userId, res)
	}

	@Post("logout")
	@HttpCode(HttpStatus.NO_CONTENT)
	logout(@Res({ passthrough: true }) res: Response) {
		res.cookie("refreshToken", "")
	}
}
