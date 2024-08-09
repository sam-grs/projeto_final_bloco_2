import { Transform, TransformFnParams } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { ProductEntity } from '../../product/entities/product.entity'

@Entity({ name: 'tb_category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    category_type: string

    @OneToMany(() => ProductEntity, (product) => product.category)
    product: ProductEntity[]
}
