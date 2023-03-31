import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column ({type: 'text',})
    title : string; 

    @Column ({type: 'numeric',})
    price: number;
}