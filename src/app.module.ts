import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "../prisma/prisma.module"
import { AuthModule } from "./auth/auth.module"
import { HandbookModule } from "./handbook/handbook.module"
import { PersonModule } from "./person/person.module"
import { UsersModule } from "./users/users.module"
import { AdminModule } from "./admin/admin.module"

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		AuthModule,
		UsersModule,
		HandbookModule,
		PersonModule,
		AdminModule
	]
})
export class AppModule {}
