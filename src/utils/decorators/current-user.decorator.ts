import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { User } from "@prisma/client"
import { Request } from "express"

interface RequestWithUser extends Request {
	user: User
}

export const CurrentUser = createParamDecorator(
	(key: keyof User, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest<RequestWithUser>()
		return key ? req.user[key] : req.user
	}
)
