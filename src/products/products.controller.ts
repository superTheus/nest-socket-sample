import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('initial')
  async initial() {
    return "Initial Product";
  }

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<CreateProductDto[]> {
    return this.productsService.findAll();
  }
}
 