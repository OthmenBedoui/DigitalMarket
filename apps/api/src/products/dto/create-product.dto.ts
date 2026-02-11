import { DeliveryType, ProductStatus } from '@prisma/client';
import { IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title!: string;

  @IsString()
  slug!: string;

  @IsString()
  description!: string;

  @IsString()
  categoryId!: string;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsArray()
  images!: string[];

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  discountPercent?: number;

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsBoolean()
  isUnlimited?: boolean;

  @IsEnum(DeliveryType)
  deliveryType!: DeliveryType;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
