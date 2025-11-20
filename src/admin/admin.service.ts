import { Injectable } from "@nestjs/common"
import { CreatePersonDto } from "../person/dto/create-person.dto"
import { PersonService } from "../person/person.service"
import { UsersService } from "../users/users.service"

@Injectable()
export class AdminService {
	constructor(
		private readonly userService: UsersService,
		private readonly personService: PersonService
	) {}

	async createDirector(dto: CreatePersonDto) {
		await this.personService.createDirector(dto)
	}

	async findAllUsers() {
		const users = await this.userService.findAll()
		return users
	}

	async findAllDirectors() {
		const directors = await this.personService.findDirectors()
		return directors
	}

	async findAllEngineers() {
		const engineers = await this.personService.findEngineers()
		return engineers
	}
}
