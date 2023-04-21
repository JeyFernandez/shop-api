import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/product.dto';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(ProductImage)
        private readonly productImageRepository: Repository<ProductImage>
    ) {}
    //Metodo para crear product

    async create (produtoDto:CreateProductDto){
        const {images = [], ...detalleProducto}= produtoDto
        const product = await this.productRepository.create({
            ...detalleProducto,
            images: images.map((image)=> 
            this.productImageRepository.create({url: image}))
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
        return this.productRepository.find();
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
        const producto = await this.productRepository.preload({
            id: id,
            ...cambio,
            images:[],
        });
        await this.productRepository.save(producto);
        return producto;
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