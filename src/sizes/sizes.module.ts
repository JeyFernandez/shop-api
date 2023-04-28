import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shirts } from './entities/size.entity';
import { ProductSize } from './entities/productShirts.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Shirts,ProductSize])],
  controllers: [SizesController],
  providers: [SizesService]
})
export class SizesModule {}
