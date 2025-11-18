import { IsEmail, IsString, IsOptional } from "class-validator"

export class CreatePersonDto {
	@IsString()
	firstName: string

	@IsString()
	lastName: string

	@IsOptional()
	@IsString()
	middleName?: string

	@IsString()
	phone: string

	@IsEmail()
	email: string
}
