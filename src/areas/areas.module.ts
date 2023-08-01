import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';

@Module({
  providers: [AreasService],
  controllers: [AreasController]
})
export class AreasModule {}
