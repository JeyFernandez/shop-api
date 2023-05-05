import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateShirtDto } from './dto/create-size.dto';

@Controller('shirt')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Post()
  create(@Body() createSizeDto: CreateShirtDto) {
    return this.sizesService.create(createSizeDto);
  }

  @Get()
  findAll() {
    return this.sizesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sizesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShirtDto: CreateShirtDto) {
    return this.sizesService.update(id, updateShirtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sizesService.remove(id);
  }
}
