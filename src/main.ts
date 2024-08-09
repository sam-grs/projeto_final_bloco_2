import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Farmácia')
        .setDescription('Projeto Final Bloco 2')
        .setContact('Samira Grossi', 'https://github.com/sam-grs', 'samira.grossi_oliveira@outlook.com')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/swagger', app, document)

    process.env.TZ = '-03:00'
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(4000)
}
bootstrap()
