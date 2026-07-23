export const INITIAL_DEPARTMENTS = [
  { id: 'dept-1', name: 'Emergency & Trauma', description: '24/7 critical care, resuscitation, and urgent trauma surgery', icon: 'AlertTriangle' },
  { id: 'dept-2', name: 'Cardiology', description: 'Advanced cardiovascular diagnosis, catheterization, and open-heart surgery', icon: 'HeartPulse' },
  { id: 'dept-3', name: 'Pediatrics', description: 'Comprehensive child healthcare, neonatal ICU, and pediatric surgery', icon: 'Baby' },
  { id: 'dept-4', name: 'Neurology & Neurosurgery', description: 'Brain and nervous system diagnostic imaging, stroke intervention', icon: 'Brain' },
  { id: 'dept-5', name: 'Orthopedics', description: 'Bone health, joint replacement, sports injury rehabilitation', icon: 'Activity' },
  { id: 'dept-6', name: 'Oncology', description: 'Radiation therapy, chemotherapy, and surgical oncology treatments', icon: 'ShieldAlert' },
];

export const INITIAL_HOSPITALS = [
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
    images: [
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80'
    ],
    departments: ['Emergency & Trauma', 'Cardiology', 'Neurology & Neurosurgery', 'Pediatrics'],
    operatingHours: '24/7 Open',
    status: 'ACTIVE',
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-07-23T10:00:00Z'
  },
  {
    id: 'hosp-102',
    name: 'St. Jude Children & Heart Institute',
    slug: 'st-jude-children-heart',
    address: '742 Evergreen Avenue',
    city: 'Metropolis',
    state: 'NY',
    zip: '10002',
    phone: '+1 (555) 345-6789',
    emergencyPhone: '+1 (555) 911-0002',
    hasEmergency: true,
    availableEmergencyBeds: 8,
    totalEmergencyBeds: 15,
    lat: 40.7306,
    lng: -73.9352,
    rating: 4.8,
    reviewCount: 215,
    images: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80'
    ],
    departments: ['Cardiology', 'Pediatrics', 'Oncology'],
    operatingHours: '24/7 Open',
    status: 'ACTIVE',
    createdAt: '2026-02-15T09:30:00Z',
    updatedAt: '2026-07-23T11:15:00Z'
  },
  {
    id: 'hosp-103',
    name: 'Apex Orthopedic & Trauma Center',
    slug: 'apex-orthopedic-trauma',
    address: '1200 Summit Boulevard',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
    phone: '+1 (555) 456-7890',
    emergencyPhone: '+1 (555) 911-0003',
    hasEmergency: true,
    availableEmergencyBeds: 12,
    totalEmergencyBeds: 20,
    lat: 40.6782,
    lng: -73.9442,
    rating: 4.7,
    reviewCount: 180,
    images: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80'
    ],
    departments: ['Emergency & Trauma', 'Orthopedics', 'Neurology & Neurosurgery'],
    operatingHours: '24/7 Open',
    status: 'ACTIVE',
    createdAt: '2026-03-01T12:00:00Z',
    updatedAt: '2026-07-23T14:20:00Z'
  },
  {
    id: 'hosp-104',
    name: 'Queens Community Specialty Hospital',
    slug: 'queens-community-specialty',
    address: '88-14 Queens Boulevard',
    city: 'Queens',
    state: 'NY',
    zip: '11373',
    phone: '+1 (555) 567-8901',
    emergencyPhone: '+1 (555) 911-0004',
    hasEmergency: false,
    availableEmergencyBeds: 0,
    totalEmergencyBeds: 0,
    lat: 40.7282,
    lng: -73.8770,
    rating: 4.5,
    reviewCount: 96,
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80'
    ],
    departments: ['Cardiology', 'Pediatrics', 'Oncology'],
    operatingHours: 'Mon-Sat: 7:00 AM - 9:00 PM',
    status: 'ACTIVE',
    createdAt: '2026-04-10T10:00:00Z',
    updatedAt: '2026-07-22T16:00:00Z'
  }
];

export const INITIAL_DOCTORS = [
  {
    id: 'doc-201',
    hospitalId: 'hosp-101',
    name: 'Dr. Marcus Vance',
    specialty: 'Chief Cardiologist',
    department: 'Cardiology',
    experienceYears: 18,
    phone: '+1 (555) 234-1100',
    email: 'm.vance@metropolisgen.org',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    status: 'ACTIVE'
  },
  {
    id: 'doc-202',
    hospitalId: 'hosp-101',
    name: 'Dr. Elena Rostova',
    specialty: 'Trauma Surgeon',
    department: 'Emergency & Trauma',
    experienceYears: 14,
    phone: '+1 (555) 234-1101',
    email: 'e.rostova@metropolisgen.org',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sun'],
    avatarUrl: 'https://images.unsplash.com/photo-1594824813566-88855ce78c00?auto=format&fit=crop&w=400&q=80',
    status: 'ACTIVE'
  },
  {
    id: 'doc-203',
    hospitalId: 'hosp-102',
    name: 'Dr. Sophia Chen',
    specialty: 'Pediatric Cardiac Specialist',
    department: 'Pediatrics',
    experienceYears: 12,
    phone: '+1 (555) 345-2201',
    email: 'schen@stjudeheart.org',
    availableDays: ['Tue', 'Wed', 'Thu', 'Sat'],
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    status: 'ACTIVE'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-301',
    hospitalId: 'hosp-101',
    userId: 'usr-1',
    userName: 'Alexander Wright',
    rating: 5,
    comment: 'The emergency department response time was incredible. Arrived with severe chest pain and was in triage within 90 seconds. Exceptional care.',
    createdAt: '2026-07-20T14:20:00Z'
  },
  {
    id: 'rev-302',
    hospitalId: 'hosp-101',
    userId: 'usr-2',
    userName: 'Samantha Miller',
    rating: 5,
    comment: 'Dr. Marcus Vance and his cardiology team saved my father. The hospital facilities are state of the art and clean.',
    createdAt: '2026-07-15T09:45:00Z'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'audit-1',
    action: 'UPDATE_BED_COUNT',
    performedBy: 'admin@medstart.org',
    targetId: 'hosp-101',
    details: 'Updated Metropolis General emergency bed capacity from 15 to 18 available beds.',
    timestamp: '2026-07-23T10:00:00Z'
  },
  {
    id: 'audit-2',
    action: 'CREATE_DOCTOR',
    performedBy: 'admin@medstart.org',
    targetId: 'doc-203',
    details: 'Assigned Dr. Sophia Chen to St. Jude Children & Heart Institute.',
    timestamp: '2026-07-22T14:30:00Z'
  }
];
