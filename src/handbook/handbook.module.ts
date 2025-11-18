import { Module } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { HandbookService } from "./handbook.service"
import { HandbookController } from "./handbook.controller"

@Module({
	controllers: [HandbookController],
	providers: [HandbookService, PrismaService]
})
export class HandbookModule {}
