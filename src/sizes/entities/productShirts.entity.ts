import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Shirts } from './size.entity';

@Entity()
export class ProductSize{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    zise:string;

    @ManyToOne(()=> Shirts, (shirts)=>
    shirts.zise,
    {onDelete:'CASCADE'}
    )
   shirts:Shirts;

}