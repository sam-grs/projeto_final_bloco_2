import { Transform, TransformFnParams } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { ProductEntity } from '../../product/entities/product.entity'

@Entity({ name: 'tb_category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @ApiProperty()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    @ApiProperty()
    category_type: string

    @ApiProperty()
    @OneToMany(() => ProductEntity, (product) => product.category)
    product: ProductEntity[]
}
