import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DigitalKeysService {
  constructor(private readonly prisma: PrismaService) {}

  async assignAvailableKeyTx(productId: string, orderItemId: string, tx: Prisma.TransactionClient) {
    const available = await tx.digitalKey.findFirst({
      where: { productId, isUsed: false },
      orderBy: { createdAt: 'asc' },
    });

    if (!available) {
      throw new BadRequestException(`No available digital key for product ${productId}`);
    }

    const used = await tx.digitalKey.update({
      where: { id: available.id },
      data: { isUsed: true, usedAt: new Date(), assignedToId: orderItemId },
    });

    await tx.orderItem.update({
      where: { id: orderItemId },
      data: {
        assignedKeyId: used.id,
        deliverySnapshot: { keyMasked: used.keyValue.slice(0, 4) + '********' },
      },
    });

    return used;
  }

  async importCsv(productId: string, rows: Array<{ keyValue: string }>) {
    return this.prisma.digitalKey.createMany({
      data: rows.map((row) => ({ productId, keyValue: row.keyValue, source: 'csv-import' })),
      skipDuplicates: true,
    });
  }
}
