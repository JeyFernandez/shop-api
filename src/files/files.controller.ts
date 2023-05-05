import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFIlter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file',
    {
      fileFilter:fileFilter, 
      storage:diskStorage({
        destination:'./static/products',
        filename:fileNamer,
      })   
    }
    )
  )
  uploadProductImage(@UploadedFile() file:Express.Multer.File) {
    if(!file){
      throw new BadRequestException('Asegurese que el archivo es una Imagen')
    }
    return {fileName: file.originalname};
  }
}
