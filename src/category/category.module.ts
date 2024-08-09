import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryEntity } from './entities/category.entity'
import { CategoryService } from './services/category.service'
import { CategoryController } from './controllers/category.controller'

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: [TypeOrmModule],
})
export class CategoryModule {}
