import { Module } from '@nestjs/common';
import { StringGenUtilService } from './string-gen-util/string-gen-util.service';

@Module({
  providers: [StringGenUtilService],
  exports: [StringGenUtilService],
})
export class UtilsModule {}
