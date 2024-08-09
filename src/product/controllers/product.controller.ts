import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common'

import { ProductService } from '../services/product.service'
import { ProductEntity } from '../entities/product.entity'

@Controller('/produtos')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<ProductEntity[]> {
        return this.productService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
        return this.productService.findById(id)
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitle(@Param('titulo') title: string): Promise<ProductEntity[]> {
        return this.productService.findByTitle(title)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() product: ProductEntity): Promise<ProductEntity> {
        return this.productService.create(product)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() product: ProductEntity): Promise<ProductEntity> {
        return this.productService.update(product)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.productService.delete(id)
    }

    @Get('/preco/:preco')
    @HttpCode(HttpStatus.OK)
    findPrice(@Param('preco') price: number, value: number): Promise<ProductEntity[]> {
        return this.productService.findPrice(price, value)
    }
}
