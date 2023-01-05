import { Controller, Get, Param, Post, Put, Delete, Body, FileTypeValidator, ParseFilePipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Categories } from './entities/category.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'userId',
})
@Controller()
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /****************Category CRUD********************/
  @Get('readCategory')
  getCategory(): Promise<Categories[]> {
    return this.categoryService.getCategory();
  }
  @Get('readCategoryItem/:id')
  getCategoryItem(@Param('id') category_id: number): Promise<Categories> {
    return this.categoryService.findOneCategoryItem(category_id);
  }
  @Post('addToCategory')
  addToCategory(@Body() category: Categories): Promise<InsertResult> {
    return this.categoryService.createCategoryItem(category);
  }

  @Post('categories/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: function (req, file, cb) {
        cb(null , 'Categories.csv');
      }
    })
  }))
  async uploadCategories(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'csv' }),
      ],
    }),
  ) file: Express.Multer.File): Promise<InsertResult> {
    return this.categoryService.uploadCategories(file);
  }

  @Put('updateCategoryItem/:id')
  updateCategory(@Param('id') category_id: number, @Body() category:Categories): Promise<UpdateResult> {
    return this.categoryService.updateCategoryItem(category_id, category);
  }
  @Delete('removeFromCategory/:id')
  deleteCategory(@Param('id') category_id: number): Promise<DeleteResult> {
    return this.categoryService.removeFromCategory(category_id);
  }
}
