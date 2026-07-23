import { Module } from '@nestjs/common';
import { HospitalsController } from './modules/hospitals/hospitals.controller';
import { HospitalsService } from './modules/hospitals/hospitals.service';

@Module({
  imports: [],
  controllers: [HospitalsController],
  providers: [HospitalsService],
})
export class AppModule {}
