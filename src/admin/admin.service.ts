import { Injectable } from "@nestjs/common"
import { PersonService } from "../person/person.service"
import { UsersService } from "../users/users.service"

@Injectable()
export class AdminService {
	constructor(
		private readonly userService: UsersService,
		private readonly personService: PersonService
	) {}

	findAllUsers() {
		return this.userService.findAll()
	}

	findAllDirectors() {
		return this.personService.findDirectors()
	}

	findAllEngineers() {
		return this.personService.findEngineers()
	}
}
