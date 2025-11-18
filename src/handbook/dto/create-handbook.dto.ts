import { IsString, IsOptional } from "class-validator"

export class CreateHandbookDto {
	@IsString()
	marketNumber: string

	@IsString()
	address: string

	@IsString()
	operatingMode: string

	@IsString()
	region: string

	@IsOptional()
	@IsString()
	directorId?: string

	@IsOptional()
	@IsString()
	engineerId?: string
}
