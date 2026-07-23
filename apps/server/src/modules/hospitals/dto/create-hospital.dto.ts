import { IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHospitalDto {
  @ApiProperty({ example: 'Metropolis General Hospital' })
  @IsString()
  name: string;

  @ApiProperty({ example: '500 Health Sciences Plaza' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Metropolis' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'NY' })
  @IsString()
  state: string;

  @ApiProperty({ example: '10001' })
  @IsString()
  zip: string;

  @ApiProperty({ example: '+1 (555) 234-5678' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '+1 (555) 911-0001' })
  @IsString()
  emergencyPhone: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  hasEmergency: boolean;

  @ApiProperty({ example: 18 })
  @IsNumber()
  availableEmergencyBeds: number;

  @ApiProperty({ example: 25 })
  @IsNumber()
  totalEmergencyBeds: number;

  @ApiProperty({ example: 40.7128 })
  @IsNumber()
  lat: number;

  @ApiProperty({ example: -74.0060 })
  @IsNumber()
  lng: number;

  @ApiProperty({ example: ['Emergency & Trauma', 'Cardiology'] })
  @IsArray()
  departments: string[];

  @ApiProperty({ example: '24/7 Open' })
  @IsString()
  operatingHours: string;
}
