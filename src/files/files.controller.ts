import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFIlter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('product/:imageName')
  findProduct(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.staticProductsImages(imageName);
    res.sendFile(path);
  }

  @Post('product')
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
}
