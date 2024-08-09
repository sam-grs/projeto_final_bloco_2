import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryModule } from './category/category.module'
import { CategoryEntity } from './category/entities/category.entity'
import { ProductModule } from './product/product.module'
import { ProductEntity } from './product/entities/product.entity'
import { AppController } from './app.controller'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '217684',
            database: 'db_bloco_2',
            entities: [CategoryEntity, ProductEntity],
            synchronize: true,
            bigNumberStrings: true,
        }),
        CategoryModule,
        ProductModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
