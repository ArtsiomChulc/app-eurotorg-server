import { PartialType } from "@nestjs/swagger"
import { CreateHandbookDto } from "./create-handbook.dto"

export class UpdateHandbookDto extends PartialType(CreateHandbookDto) {}
