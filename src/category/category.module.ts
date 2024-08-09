import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity } from './index'
import { CategoryService } from './index'
import { CategoryController } from './index'

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: [TypeOrmModule],
})
export class CategoryModule {}
