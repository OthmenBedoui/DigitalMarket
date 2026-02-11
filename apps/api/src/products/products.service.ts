import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...dto,
        discountPercent: dto.discountPercent ?? 0,
        isUnlimited: dto.isUnlimited ?? false,
      },
    });
  }

  findAllActive() {
    return this.prisma.product.findMany({
      where: { status: 'ACTIVE' },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, dto: Partial<CreateProductDto>) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Product not found');

    return this.prisma.product.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.product.update({ where: { id }, data: { status: 'INACTIVE' } });
  }
}
