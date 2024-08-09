import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CategoryService } from '../services/category.service'
import { CategoryEntity } from '../entities/category.entity'

@ApiTags('Categoria')
@Controller('/categorias')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<CategoryEntity[]> {
        return this.categoryService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<CategoryEntity> {
        return this.categoryService.findById(id)
    }

    @Get('/tipo/:tipo')
    @HttpCode(HttpStatus.OK)
    findByType(@Param('tipo') category_type: string): Promise<CategoryEntity[]> {
        return this.categoryService.findByType(category_type)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() category: CategoryEntity): Promise<CategoryEntity> {
        return this.categoryService.create(category)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() category: CategoryEntity): Promise<CategoryEntity> {
        return this.categoryService.update(category)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.delete(id)
    }
}
