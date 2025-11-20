import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { CreatePersonDto } from "./dto/create-person.dto"
import { UpdatePersonDto } from "./dto/update-person.dto"

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
		const directors = await this.prisma.director.findMany({
			orderBy: { lastName: "asc" }
		})
		return directors
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

	async updateDirector(id: number, dto: UpdatePersonDto) {
		const director = await this.prisma.director.findUnique({ where: { id } })

		if (!director) {
			throw new BadRequestException("Директор не найден")
		}

		// Проверка уникальности email, если email передан
		if (dto.email && dto.email !== director.email) {
			const emailExists = await this.prisma.director.findUnique({
				where: { email: dto.email }
			})
			if (emailExists) {
				throw new BadRequestException("Пользователь с таким email уже существует")
			}
		}

		return this.prisma.director.update({
			where: { id },
			data: dto
		})
	}

	async updateEngineer(id: number, dto: UpdatePersonDto) {
		const engineer = await this.prisma.engineer.findUnique({ where: { id } })

		if (!engineer) {
			throw new BadRequestException("Инженер не найден")
		}

		// Проверка уникальности email, если email передан
		if (dto.email && dto.email !== engineer.email) {
			const emailExists = await this.prisma.engineer.findUnique({
				where: { email: dto.email }
			})
			if (emailExists) {
				throw new BadRequestException("Пользователь с таким email уже существует")
			}
		}

		return this.prisma.engineer.update({
			where: { id },
			data: dto
		})
	}
}
