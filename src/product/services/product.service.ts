import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DeleteResult, ILike, Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { CategoryService } from '../../category/services/category.service'
import { ProductEntity } from '../entities/product.entity'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        private categoryService: CategoryService,
    ) {}

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            relations: { category: true },
        })
    }

    async findById(id: number): Promise<ProductEntity> {
        let product = await this.productRepository.findOne({
            where: { id },
            relations: { category: true },
        })

        if (!product) throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)

        return product
    }

    async findByTitle(title: string): Promise<ProductEntity[]> {
        return await this.productRepository.find({
            where: { title: ILike(`%${title}%`) },
            relations: { category: true },
        })
    }

    async create(product: ProductEntity): Promise<ProductEntity> {
        if (product.category) {
            let category = await this.categoryService.findById(product.category.id)
            if (!category) throw new HttpException('Categoria não foi encontrada!', HttpStatus.NOT_FOUND)
        }

        return await this.productRepository.save(product)
    }

    async update(product: ProductEntity): Promise<ProductEntity> {
        let id = await this.findById(product.id)

        if (!id || !product.id) throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)
        if (product.category) {
            await this.categoryService.findById(product.category.id)
            return await this.productRepository.save(product)
        }

        return await this.productRepository.save(product)
    }

    async delete(id: number): Promise<DeleteResult> {
        let product = await this.findById(id)
        if (!product) throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND)
        return await this.productRepository.delete(id)
    }

    // ver se isso faz sentido implementar
    async findPrice(price: number, value: number = 500): Promise<ProductEntity[]> {
        if (price <= 0) {
            throw new HttpException('Preço deve ser maior que zero!', HttpStatus.BAD_REQUEST)
        }
        if (price >= value) {
            return await this.productRepository.find({
                where: { price: MoreThanOrEqual(price) },
                relations: { category: true },
                order: { price: 'ASC' },
            })
        }
        return await this.productRepository.find({
            where: { price: LessThanOrEqual(price) },
            relations: { category: true },
            order: { price: 'DESC' },
        })
    }
}
