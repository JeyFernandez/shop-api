import { Injectable } from '@nestjs/common';
import { CreateShirtDto } from './dto/create-size.dto';
import { Shirts } from './entities/size.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ProductSize } from './entities/productShirts.entity';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Shirts)
  private readonly shirtsRepository: Repository<Shirts>,

  @InjectRepository(ProductSize)
  private readonly sizeRepository: Repository<ProductSize>,
  private readonly dataSource: DataSource,
  ){}

  async create(createShirtDto: CreateShirtDto) {
    const {zise= [], ...detalleZise}= createShirtDto
    const shirt = await this.shirtsRepository.create
    ({
      ...detalleZise,
      zise:zise.map((zise)=>
      this.sizeRepository.create({zise:zise}))
    })
    await this.shirtsRepository.save(shirt)
    return shirt;
  }

  findAll() {
    return this.shirtsRepository.find({relations:['zise']});
  }

  findOne(id: string) {
    return this.shirtsRepository.findOneBy({id});
  }

  async update(id: string, cambio: CreateShirtDto){
    const {zise, ...updateAll} = cambio;

    const shirt = await this.shirtsRepository.preload({
        id: id,
        ...updateAll,
    });

    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    

    if(zise){
        await queryRunner.manager.delete(ProductSize, {shirt: {id}});
        
        shirt.zise = await zise.map((zise)=>
        this.sizeRepository.create({zise: zise})
        );
    }
    // else{ 
    //     product.images = await this.imageRepository.findBy({product:{id}});
    // }

    // await queryRunner.manager.save(product);
    // await queryRunner.commitTransaction();
    // await queryRunner.release();
    // return product;
}
  remove(id:string) {
    return `This action removes a #${id} size`;
  }
}
