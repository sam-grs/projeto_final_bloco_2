import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '217684',
            database: 'db_bloco_2',
            entities: [],
            synchronize: true,
            bigNumberStrings: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
