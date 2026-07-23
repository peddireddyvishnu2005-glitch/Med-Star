import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';

@ApiTags('Hospitals')
@Controller('api/v1/hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get()
  @ApiOperation({ summary: 'List all verified hospitals with optional filters' })
  @ApiResponse({ status: 200, description: 'List of hospitals returned successfully.' })
  findAll(@Query('city') city?: string, @Query('emergencyOnly') emergencyOnly?: boolean) {
    return this.hospitalsService.findAll(city, emergencyOnly);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get detailed hospital profile by ID' })
  findOne(@Param('id') id: string) {
    return this.hospitalsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new hospital record (Admin Privileges Required)' })
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalsService.create(createHospitalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete hospital record (Admin Privileges Required)' })
  remove(@Param('id') id: string) {
    return this.hospitalsService.remove(id);
  }
}
