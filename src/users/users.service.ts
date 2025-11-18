import {
	Injectable,
	BadRequestException,
	NotFoundException,
	ConflictException
} from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { GetUserDto } from "./dto/get-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create({ email, region, lastName, name, hashedPassword }: CreateUserDto) {
		const existingUser = await this.prisma.user.findUnique({
			where: { email: email }
		})
		if (existingUser)
			throw new ConflictException("Пользователь с таким email уже существует")
		const engineer = await this.prisma.engineer.findUnique({
			where: { email }
		})

		// Если найден инженер, присваиваем роль ENGINEER
		const role = engineer ? "ENGINEER" : "USER"
		const user = await this.prisma.user.create({
			data: {
				email,
				region,
				lastName,
				name,
				role,
				hashedPassword
			}
		})

		return user
	}

	async getOne({ id, email }: GetUserDto) {
		if (!id && !email) {
			throw new BadRequestException()
		}

		const user = await this.prisma.user.findFirst({
			where: {
				id,
				email
			}
		})
		return user
	}

	async findAll() {
		const users = await this.prisma.user.findMany()
		if (!users) throw new BadRequestException("Either email or id must be provided")
		return users
	}

	async findOne(id: number) {
		const user = await this.prisma.user.findUnique({ where: { id } })
		if (!user) throw new BadRequestException("Either email or id must be provided")
		return user
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	async remove(id: number) {
		const user = await this.prisma.user.findUnique({ where: { id } })
		if (!user) {
			throw new NotFoundException(`Пользователь с ID ${id} не найден`)
		}
		return this.prisma.user.delete({
			where: { id }
		})
	}
}
