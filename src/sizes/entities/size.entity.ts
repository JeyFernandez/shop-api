import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductSize } from './productShirts.entity';
@Entity()
export class Shirts {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    color:string;

    @Column()
    brand:string;

    @OneToMany(
        ()=> ProductSize, (productZise)=> productZise.zise,
        {cascade:true, eager:true}
    )
    zise?:ProductSize[];
}