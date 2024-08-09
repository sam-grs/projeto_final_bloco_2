import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DeleteResult, ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryEntity } from '../entities/category.entity'

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>,
    ) {}

    async findAll(): Promise<CategoryEntity[]> {
        return await this.categoryRepository.find()
    }

    async findById(id: number): Promise<CategoryEntity> {
        let category = await this.categoryRepository.findOne({ where: { id } })

        if (!category) throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)
        return category
    }

    async findByType(category_type: string): Promise<CategoryEntity[]> {
        return await this.categoryRepository.find({
            where: { category_type: ILike(`%${category_type}%`) },
        })
    }

    async create(category: CategoryEntity): Promise<CategoryEntity> {
        return await this.categoryRepository.save(category)
    }

    async update(category: CategoryEntity): Promise<CategoryEntity> {
        let id = await this.findById(category.id)

        if (!id || !category.id) throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)
        return await this.categoryRepository.save(category)
    }

    async delete(id: number): Promise<DeleteResult> {
        let category = await this.findById(id)

        if (!category) throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)
        return await this.categoryRepository.delete(id)
    }
}
