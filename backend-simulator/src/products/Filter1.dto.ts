
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class Filter1 {
 
  @IsNumber()
  readonly rating: number;

  
  @IsString()
  readonly categories: string;

 
  @IsString()
  readonly brands: string;

  
  @IsNumber()
  readonly minPrice: number;

 
  @IsNumber()
  readonly maxPrice: number;

}
