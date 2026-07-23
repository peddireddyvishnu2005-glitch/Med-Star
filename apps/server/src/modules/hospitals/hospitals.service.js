import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class HospitalsService {
  hospitals = [
    {
      id: 'hosp-101',
      name: 'Metropolis General Hospital',
      slug: 'metropolis-general',
      address: '500 Health Sciences Plaza',
      city: 'Metropolis',
      state: 'NY',
      zip: '10001',
      phone: '+1 (555) 234-5678',
      emergencyPhone: '+1 (555) 911-0001',
      hasEmergency: true,
      availableEmergencyBeds: 18,
      totalEmergencyBeds: 25,
      lat: 40.7128,
      lng: -74.0060,
      rating: 4.9,
      reviewCount: 342,
      departments: ['Emergency & Trauma', 'Cardiology', 'Neurology & Neurosurgery', 'Pediatrics'],
      operatingHours: '24/7 Open',
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    }
  ];

  findAll(city, emergencyOnly) {
    let result = this.hospitals;
    if (city && city !== 'ALL') {
      result = result.filter(h => h.city.toLowerCase() === city.toLowerCase());
    }
    if (emergencyOnly) {
      result = result.filter(h => h.hasEmergency);
    }
    return result;
  }

  findOne(id) {
    const hospital = this.hospitals.find(h => h.id === id);
    if (!hospital) {
      throw new NotFoundException(`Hospital with ID ${id} not found`);
    }
    return hospital;
  }

  create(dto) {
    const newHosp = {
      id: `hosp-${Date.now()}`,
      slug: dto.name.toLowerCase().replace(/\s+/g, '-'),
      ...dto,
      rating: 5.0,
      reviewCount: 1,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };
    this.hospitals.push(newHosp);
    return newHosp;
  }

  remove(id) {
    const index = this.hospitals.findIndex(h => h.id === id);
    if (index === -1) {
      throw new NotFoundException(`Hospital with ID ${id} not found`);
    }
    this.hospitals.splice(index, 1);
    return { message: 'Hospital removed successfully' };
  }
}
