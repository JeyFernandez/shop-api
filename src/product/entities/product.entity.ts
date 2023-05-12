import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column ({type: 'text',})
    title : string; 

    @Column ({type: 'numeric',})
    price: number;

    @Column({type: 'varchar', nullable: true})
    filename:string;

    //relacion
    @OneToMany(
        ()=> ProductImage,
        (productImage) => productImage.product,
        {cascade: true, eager: true}
    )
    images?:ProductImage[];
}