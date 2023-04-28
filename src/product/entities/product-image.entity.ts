import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
@Entity()
export class ProductImage{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    url: string;
    //relacion de muchos a uno
    // muchas imagenes pueden ser de un producto
    @ManyToOne(() => Product, (product) => product.images,
    {onDelete:'CASCADE'}
    )
    product:Product;
}