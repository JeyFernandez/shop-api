import { Body, Controller, Post, Get, Param, ParseUUIDPipe, Delete, Patch, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/files/helpers/fileFIlter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/files/helpers/fileNamer.helper';

@Controller('products')
export class ProductsController {
    constructor(private readonly ProductsServiceRepo: ProductsService) {}
    
    //metodo para crear un producto
    @Post()
    create(@Body() produtDto: CreateProductDto){
        return this.ProductsServiceRepo.create(produtDto);
    }


    //Metodo para mostrar todo los productos 
    @Get()
    findAll(){
        return this.ProductsServiceRepo.findAll();
    }
    //Mpstrat un producto especifico
    @Get(':id')
    finOne(
        @Param('id', ParseUUIDPipe) id:string,) {
            return this.ProductsServiceRepo.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id:string) {
        return this.ProductsServiceRepo.remove(id);
    }


    @Patch(":id")
    updateProduct(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() cambioDto: CreateProductDto
    ) {
        return this.ProductsServiceRepo.update(id, cambioDto);
    }
}