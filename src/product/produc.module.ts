import { Module, Controller } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './product.service';
import { ProductImage } from './entities/product-image.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductImage])],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ModuleProduct{}