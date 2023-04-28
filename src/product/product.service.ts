import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/product.dto';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(ProductImage)
        private readonly imageRepository: Repository<ProductImage>,
        private readonly dataSource: DataSource,
    ) {}
    //Metodo para crear product

    async create (produtoDto:CreateProductDto){
        const {images = [], ...detalleProducto}= produtoDto
        const product = await this.productRepository.create({
            ...detalleProducto,
            images: images.map((image)=> 
            this.imageRepository.create({url: image}))
        })
        await this.productRepository.save(product);
        return product;
    }
/*     async create(productoDto:CreateProductDto) {
        const product = await this.productRepository.create(productoDto);
        await this.productRepository.save(product);
        return product;
    } */

    findAll(){
        return this.productRepository.find({relations:['images']});
    }

    //metodo para ver un porfucto
    findOne(id:string){
        return this.productRepository.findOneBy({id});
    }

    //remover un producto especifico 
    async remove(id:string){
        const producto = await this.findOne(id);
        await this.productRepository.remove(producto);
        return 'Product removed successfully'
    }

    //actualizar product especifico
    async update(id: string, cambio: CreateProductDto){
        const {images, ...updateAll} = cambio;

        const product = await this.productRepository.preload({
            id: id,
            ...updateAll,
        });
        //Consultar a la base de datos para modificarla.
        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        //si vienen nuevas imagenes que se eliminen las anteriores
        if(images){
            await queryRunner.manager.delete(ProductImage, {product: {id}});
            
            product.images = await images.map((image)=>
            this.imageRepository.create({url: image})
            );
        }
        else{ 
            product.images = await this.imageRepository.findBy({product:{id}});
        }

        await queryRunner.manager.save(product);
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return product;
    }
/*     async update(id: string, cambioDto: CreateProductDto) {
        const findCategories = await this.findOne(id);
        const updateProduct = await this.productRepository.merge(
            findCategories,
            cambioDto
        );
    
        return this.productRepository.save(updateProduct);
    }
 */

}