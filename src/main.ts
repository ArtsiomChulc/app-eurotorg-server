import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import * as cookieParser from "cookie-parser"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(new ValidationPipe())

	app.enableCors({
		// origin: 'https://todo-list-develop.netlify.app',
		origin: "http://localhost:5173", // Разрешаем запросы с фронтенда
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		credentials: true // Разрешаем передачу cookies и авторизации
	})

	app.use(cookieParser())

	const config = new DocumentBuilder()
		.setTitle("Todos example")
		.setDescription("The todos API description")
		.setVersion("1.0")
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				name: "JWT",
				description: "Enter JWT token",
				in: "header"
			},
			"JWT-auth"
		)
		.build()
	const documentFactory = () => SwaggerModule.createDocument(app, config)
	SwaggerModule.setup("api", app, documentFactory)

	await app.listen(process.env.PORT ?? 3000)
	console.log(`Server started on port ${process.env.PORT}`)
}

bootstrap().catch(err => {
	console.error(err)
})
