import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Product Service');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database Connected');
  }
  create(createProductDto: CreateProductDto) {
    return this.product.create({ data: createProductDto });
  }

  async findAll({ page, limit }: PaginationDto) {
    const totalProducts = await this.product.count({
      where: { available: true },
    });
    const lastPage = Math.ceil(totalProducts / limit);
    const data = await this.product.findMany({
      where: { available: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        total: totalProducts,
        page: page,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({
      where: { id, available: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }

    return product;
  }

  async update({ id, ...data }: UpdateProductDto) {
    await this.findOne(id);

    return this.product.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.product.update({ where: { id }, data: { available: false } });
  }
}
