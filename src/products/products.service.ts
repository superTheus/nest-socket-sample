import { Injectable } from '@nestjs/common';
import { Products } from './interfaces/products.interfaces';

@Injectable()
export class ProductsService {
  private readonly product: Products[] = [];

  create(product: Products) {
    this.product.push(product);
  }

  findAll(): Products[] {
    return this.product;
  }
}
