import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { CreatePersonDto } from "./dto/create-person.dto"

@Injectable()
export class PersonService {
	constructor(private prisma: PrismaService) {}

	async createDirector(dto: CreatePersonDto) {
		const directorExisting = await this.prisma.director.findUnique({
			where: {
				email: dto.email
			}
		})
		if (directorExisting) {
			throw new BadRequestException("Пользователь с таким email уже существует")
		}
		return await this.prisma.director.create({ data: dto })
	}

	async findDirectors() {
		return await this.prisma.director.findMany({ orderBy: { lastName: "asc" } })
	}

	async createEngineer(dto: CreatePersonDto) {
		const engineerExisting = await this.prisma.engineer.findUnique({
			where: {
				email: dto.email
			}
		})
		if (engineerExisting) {
			throw new BadRequestException("Пользователь с таким email уже существует")
		}
		return await this.prisma.engineer.create({ data: dto })
	}

	async findEngineers() {
		return await this.prisma.engineer.findMany({ orderBy: { lastName: "asc" } })
	}
}
