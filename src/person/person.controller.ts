import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { JwtAccessGuard } from "../auth/guards/jwt-access.guard"
import { CreatePersonDto } from "./dto/create-person.dto"
import { PersonService } from "./person.service"

@UseGuards(JwtAccessGuard)
@Controller("people")
export class PersonController {
	constructor(private personService: PersonService) {}

	@Post("director")
	createDirector(@Body() dto: CreatePersonDto) {
		return this.personService.createDirector(dto)
	}

	@Get("directors")
	findDirectors() {
		return this.personService.findDirectors()
	}

	@Post("engineer")
	createEngineer(@Body() dto: CreatePersonDto) {
		return this.personService.createEngineer(dto)
	}

	@Get("engineers")
	findEngineers() {
		return this.personService.findEngineers()
	}
}
