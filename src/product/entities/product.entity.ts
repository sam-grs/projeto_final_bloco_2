import { Transform, TransformFnParams } from 'class-transformer'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { CategoryEntity } from '../../category/entities/category.entity'

@Entity({ name: 'tb_products' })
export class ProductEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @ApiProperty()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    @ApiProperty()
    title: string

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    @ApiProperty()
    price: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 500, nullable: false })
    @ApiProperty()
    photo: string

    @UpdateDateColumn()
    @ApiProperty()
    date_time: Date

    @ApiProperty({ type: () => CategoryEntity })
    @ManyToOne(() => CategoryEntity, (category) => category.product, {
        onDelete: 'CASCADE',
    })
    category: CategoryEntity
}
