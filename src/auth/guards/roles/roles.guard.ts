import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { ROLES_KEY } from "../../../utils/decorators/roles.decorator"
import { Request } from "express"

interface RequestWithUser extends Request {
	user: {
		role: string
	}
}

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<RequestWithUser>()
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (!requiredRoles) return true
		return requiredRoles.includes(request.user.role)
	}
}
