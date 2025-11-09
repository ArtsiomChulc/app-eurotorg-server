import { IsDefined, IsNotEmpty, IsEmail, MinLength, IsString } from "class-validator"

export class RegisterDto {
	@IsDefined()
	@IsString()
	@IsNotEmpty()
	name: string

	@IsDefined()
	@IsString()
	@IsNotEmpty()
	lastName: string

	@IsDefined()
	@IsString()
	@IsNotEmpty()
	region: string

	@IsDefined()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsDefined()
	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string
}
