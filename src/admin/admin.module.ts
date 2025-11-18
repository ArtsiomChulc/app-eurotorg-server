import { Module } from "@nestjs/common"
import { PersonModule } from "../person/person.module"
import { UsersModule } from "../users/users.module"
import { AdminService } from "./admin.service"
import { AdminController } from "./admin.controller"

@Module({
	imports: [UsersModule, PersonModule],
	controllers: [AdminController],
	providers: [AdminService]
})
export class AdminModule {}
