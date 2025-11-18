import { Controller, Get, Post, Body, Query, UseGuards } from "@nestjs/common"
import { JwtAccessGuard } from "../auth/guards/jwt-access.guard"
import { HandbookService } from "./handbook.service"
import { CreateHandbookDto } from "./dto/create-handbook.dto"

@UseGuards(JwtAccessGuard)
@Controller("handbook")
export class HandbookController {
	constructor(private readonly handbookService: HandbookService) {}

	@Post("create")
	create(@Body() dto: CreateHandbookDto) {
		return this.handbookService.create(dto)
	}

	@Get()
	findAll(
		@Query("region") region?: string,
		@Query("director") directorId?: string,
		@Query("engineer") engineerId?: string
	) {
		return this.handbookService.findAll({
			region,
			directorId,
			engineerId
		})
	}

	@Get("get-filters")
	getFilters() {
		return this.handbookService.findFilters()
	}
}
