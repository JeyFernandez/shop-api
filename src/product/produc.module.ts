import { Module, Controller } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [],
    providers: [],
})
export class ModuleProduct{}