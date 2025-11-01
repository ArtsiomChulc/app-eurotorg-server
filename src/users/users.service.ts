import { Injectable, ConflictException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	// async createOne({ email, password, region, lastName, name }: CreateUserDto) {
	// 	const existingUser = await this.prisma.user.findUnique({
	// 		where: { email }
	// 	})
	// 	if (existingUser) {
	// 		throw new ConflictException(`User with email ${email} already exists`)
	// 	}
	//
	// 	return this.prisma.user.create({
	// 		data: { email, password, name, region, lastName }
	// 	})
	// }

	findAll() {
		return `This action returns all users`
	}

	findOne({ id: number }) {}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
