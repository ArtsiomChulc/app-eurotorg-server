import { Injectable, BadRequestException, ConflictException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { CreateHandbookDto } from "./dto/create-handbook.dto"

@Injectable()
export class HandbookService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateHandbookDto) {
		const existingMarket = await this.prisma.market.findFirst({
			where: {
				marketNumber: dto.marketNumber
			}
		})
		if (existingMarket) {
			throw new ConflictException(
				`Магазин номер ${existingMarket.marketNumber} уже есть в списке`
			)
		}
		return this.prisma.market.create({
			data: {
				marketNumber: dto.marketNumber,
				address: dto.address,
				operatingMode: dto.operatingMode,
				region: dto.region,
				directorId: +dto.directorId,
				engineerId: +dto.engineerId
			},
			include: {
				director: true,
				engineer: true
			}
		})
	}

	async findAll(filters?: {
		region?: string
		directorId?: string
		engineerId?: string
	}) {
		const where: Record<string, any> = {}
		if (filters?.directorId) {
			const directorExists = await this.prisma.director.findUnique({
				where: { id: +filters.directorId }
			})
			if (!directorExists) {
				throw new BadRequestException(
					`Директор с id=${filters.directorId} не найден`
				)
			}
			where.directorId = +filters.directorId
		}
		if (filters?.engineerId) {
			const engineerExists = await this.prisma.engineer.findUnique({
				where: { id: +filters.engineerId }
			})
			if (!engineerExists) {
				throw new BadRequestException(
					`Инженер с id=${filters.engineerId} не найден`
				)
			}
			where.engineerId = +filters.engineerId
		}
		if (filters?.region) {
			where.region = filters.region
		}
		return this.prisma.market.findMany({
			where,
			include: {
				director: true,
				engineer: true
			},
			orderBy: { id: "asc" }
		})
	}

	async findFilters() {
		const regions = await this.prisma.market.findMany({
			distinct: ["region"],
			select: { region: true }
		})

		const directors = await this.prisma.director.findMany()
		const engineers = await this.prisma.engineer.findMany()

		return {
			regions: regions.map(r => r.region),
			directors,
			engineers
		}
	}
}
