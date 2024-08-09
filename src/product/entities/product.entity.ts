import { Transform, TransformFnParams } from 'class-transformer'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { CategoryEntity } from '../../category/entities/category.entity'

@Entity({ name: 'tb_products' })
export class ProductEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    title: string

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 500, nullable: false })
    photo: string

    @UpdateDateColumn()
    date_time: Date

    @ManyToOne(() => CategoryEntity, (category) => category.product, {
        onDelete: 'CASCADE',
    })
    category: CategoryEntity
}
