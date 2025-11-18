import { Controller, Get, UseGuards } from "@nestjs/common"
import { JwtAccessGuard } from "../auth/guards/jwt-access.guard"
import { RolesGuard } from "../auth/guards/roles/roles.guard"
import { Roles } from "../utils/decorators/roles.decorator"
import { AdminService } from "./admin.service"

@Controller("admin")
@UseGuards(JwtAccessGuard, RolesGuard)
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get("users")
	@Roles("ADMIN")
	findAllUsers() {
		return this.adminService.findAllUsers()
	}

	@Get("directors")
	@Roles("ADMIN")
	findAllDirectors() {
		return this.adminService.findAllDirectors()
	}

	@Get("engineers")
	@Roles("ADMIN")
	findAll() {
		return this.adminService.findAllEngineers()
	}
}
