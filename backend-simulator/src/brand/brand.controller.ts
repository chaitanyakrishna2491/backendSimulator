import { Controller, Get, Param, Post, Put, Delete, Body, FileTypeValidator, ParseFilePipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  /****************Brand CRUD********************/
  @Get('readBrand')
  getBrand(): Promise<Brand[]> {
    return this.brandService.getBrand();
  }
  @Get('readBrandItem/:id')
  getBrandItem(@Param('id') brand_id: number): Promise<Brand> {
    return this.brandService.findOneBrandItem(brand_id);
  }
  @Post('addToBrand')
  addToBrand(@Body() brand: Brand): Promise<InsertResult> {
    return this.brandService.createBrandItem(brand);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: function (req, file, cb) {
        cb(null , 'Brands.csv');
      }
    })
  }))
  async uploadProducts(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'csv' }),
      ],
    }),
  ) file: Express.Multer.File): Promise<InsertResult> {
    return this.brandService.uploadBrands(file);
  }
  @Put('updateBrandItem/:id')
  updateBrand(@Param('id') brand_id: number, @Body() brand:Brand): Promise<UpdateResult> {
    return this.brandService.updateBrandItem(brand_id, brand);
  }
  @Delete('removeFromBrand/:id')
  deleteBrand(@Param('id') brand_id: number): Promise<DeleteResult> {
    return this.brandService.removeFromBrand(brand_id);
  }
}
