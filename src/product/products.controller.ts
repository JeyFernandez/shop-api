import { Body, Controller, Post, Get, Param, ParseUUIDPipe, Delete, Patch, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/files/helpers/fileFIlter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/files/helpers/fileNamer.helper';
import { FilesService } from '../files/files.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly ProductsServiceRepo: ProductsService,
        ) {}
    
    //metodo para crear un producto
    @Post()
    create(@Body() produtDto: CreateProductDto){
        return this.ProductsServiceRepo.create(produtDto);
    }
    //intentando agragra imagen

    @Post('image')
    @UseInterceptors(
      FileInterceptor('file', {
        fileFilter: fileFilter,
        storage: diskStorage({
          destination: './static/products',
          filename: fileNamer,
        }),
      }),
    )
    uploadProductImage(@UploadedFile() file: Express.Multer.File) {
      //si no viene un imagen nos manda este mensaje
      if (!file) {
        throw new BadRequestException('Asegurese que el archivo es una Imagen');
      }
      const getUrl = `${file.filename}`;
      return getUrl;
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