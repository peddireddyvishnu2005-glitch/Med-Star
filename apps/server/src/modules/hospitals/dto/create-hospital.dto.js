import { IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHospitalDto {
  @ApiProperty({ example: 'Metropolis General Hospital' })
  @IsString()
  name;

  @ApiProperty({ example: '500 Health Sciences Plaza' })
  @IsString()
  address;

  @ApiProperty({ example: 'Metropolis' })
  @IsString()
  city;

  @ApiProperty({ example: 'NY' })
  @IsString()
  state;

  @ApiProperty({ example: '10001' })
  @IsString()
  zip;

  @ApiProperty({ example: '+1 (555) 234-5678' })
  @IsString()
  phone;

  @ApiProperty({ example: '+1 (555) 911-0001' })
  @IsString()
  emergencyPhone;

  @ApiProperty({ example: true })
  @IsBoolean()
  hasEmergency;

  @ApiProperty({ example: 18 })
  @IsNumber()
  availableEmergencyBeds;

  @ApiProperty({ example: 25 })
  @IsNumber()
  totalEmergencyBeds;

  @ApiProperty({ example: 40.7128 })
  @IsNumber()
  lat;

  @ApiProperty({ example: -74.0060 })
  @IsNumber()
  lng;

  @ApiProperty({ example: ['Emergency & Trauma', 'Cardiology'] })
  @IsArray()
  departments;

  @ApiProperty({ example: '24/7 Open' })
  @IsString()
  operatingHours;
}
