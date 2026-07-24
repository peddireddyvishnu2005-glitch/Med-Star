export type UserRole = "GUEST" | "USER" | "PATIENT" | "DOCTOR" | "HOSPITAL_ADMIN" | "ADMIN" | "SUPER_ADMIN";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  favorites: string[];
  createdAt: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  title: string;
  doctorName: string;
  hospitalName: string;
  diagnosis: string;
  prescriptionSummary?: string;
  documentUrl?: string;
}

export interface PatientProfile {
  id: string;
  userId: string;
  fullName: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  heightCm: number;
  weightKg: number;
  allergies: string[];
  chronicDiseases: string[];
  emergencyContacts: EmergencyContact[];
  medicalRecords: MedicalRecord[];
  healthCardNumber: string;
  qrCodeUrl?: string;
  organDonor: boolean;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  icon: string;
  headDoctor?: string;
  procedures?: string[];
  commonConditions?: string[];
}

export interface DoctorReview {
  id: string;
  doctorId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpfulVotes?: number;
  verified: boolean;
}

export interface DoctorAvailability {
  dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  startTime: string; // e.g. "09:00"
  endTime: string;   // e.g. "17:00"
  maxSlots: number;
}

export interface Doctor {
  id: string;
  hospitalId: string;
  hospitalName?: string;
  name: string;
  specialty: string;
  department: string;
  qualifications: string[];
  experienceYears: number;
  languages: string[];
  consultationFee: number;
  phone: string;
  email: string;
  isVerified: boolean;
  availableDays: string[];
  availabilities: DoctorAvailability[];
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  onlineStatus: "ONLINE" | "OFFLINE" | "BUSY";
  status: "ACTIVE" | "INACTIVE";
}

export interface HospitalReview {
  id: string;
  hospitalId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  createdAt: string;
  verified: boolean;
}

export interface Hospital {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  emergencyPhone: string;
  hasEmergency: boolean;
  availableEmergencyBeds: number;
  totalEmergencyBeds: number;
  availableIcuBeds: number;
  totalIcuBeds: number;
  bloodBankStock: Record<string, number>; // e.g. { "A+": 12, "O-": 4 }
  hasPharmacy: boolean;
  hasOperationTheatre: boolean;
  isWheelchairAccessible: boolean;
  hasParking: boolean;
  insuranceAccepted: string[];
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  images: string[];
  virtualTour360Url?: string;
  departments: string[];
  operatingHours: string;
  isVerified: boolean;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  distanceKm?: number;
}

export type AppointmentType = "IN_PERSON" | "VIDEO_CONSULTATION";
export type AppointmentStatus = "SCHEDULED" | "CONFIRMED" | "IN_QUEUE" | "COMPLETED" | "CANCELLED" | "NO_SHOW";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  hospitalId: string;
  hospitalName: string;
  type: AppointmentType;
  date: string; // YYYY-MM-DD
  timeSlot: string; // "10:30 AM"
  status: AppointmentStatus;
  queueNumber?: number;
  notes?: string;
  consultationFee: number;
  paymentStatus: "PENDING" | "PAID" | "REFUNDED";
  meetingLink?: string;
  createdAt: string;
}

export type EmergencySeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface EmergencyRequest {
  id: string;
  userId: string;
  patientName: string;
  phone: string;
  lat: number;
  lng: number;
  address: string;
  severity: EmergencySeverity;
  symptoms: string[];
  assignedHospitalId?: string;
  assignedHospitalName?: string;
  assignedAmbulanceId?: string;
  ambulanceDriverName?: string;
  ambulanceDriverPhone?: string;
  ambulanceLat?: number;
  ambulanceLng?: number;
  etaMins?: number;
  status: "PENDING" | "DISPATCHED" | "EN_ROUTE" | "ARRIVED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}

export interface SymptomCheckResult {
  triageLevel: "EMERGENCY" | "URGENT" | "NON_URGENT";
  possibleConditions: Array<{
    name: string;
    probability: string;
    description: string;
  }>;
  recommendedSpecialties: string[];
  urgentAdvice: string;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  dosage: string;
  requiresPrescription: boolean;
  inStock: boolean;
  stockCount: number;
  imageUrl: string;
  description: string;
}

export interface PharmacyOrder {
  id: string;
  userId: string;
  userName: string;
  shippingAddress: string;
  items: Array<{
    medicineId: string;
    medicineName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  prescriptionUrl?: string;
  status: "PLACED" | "PROCESSING" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";
  createdAt: string;
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  turnaroundTime: string;
  fastingRequired: boolean;
  sampleType: string;
}

export interface LabBooking {
  id: string;
  userId: string;
  userName: string;
  labTestId: string;
  labTestName: string;
  bookingDate: string;
  timeSlot: string;
  sampleCollectionType: "HOME_COLLECTION" | "LAB_VISIT";
  address?: string;
  price: number;
  status: "BOOKED" | "SAMPLE_COLLECTED" | "PROCESSING" | "COMPLETED";
  reportUrl?: string;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  paymentMethod: "UPI" | "RAZORPAY" | "STRIPE" | "INSURANCE" | "CASH";
  purpose: "APPOINTMENT" | "PHARMACY" | "LAB_TEST" | "EMERGENCY_AMBULANCE";
  referenceId: string; // appointmentId / orderId / labBookingId
  status: "SUCCESS" | "PENDING" | "FAILED" | "REFUNDED";
  transactionDate: string;
}

export interface NavigationStep {
  instruction: string;
  distance: string;
  duration: string;
  icon: "straight" | "turn-left" | "turn-right" | "destination" | "uturn";
}

export interface RouteInfo {
  distanceKm: number;
  durationMins: number;
  geometry: [number, number][];
  steps: NavigationStep[];
}

export interface RouteHistoryItem {
  id: string;
  hospitalId: string;
  hospitalName: string;
  startLat: number;
  startLng: number;
  destLat: number;
  destLng: number;
  distanceKm: number;
  durationMins: number;
  timestamp: string;
}

export interface SystemAuditLog {
  id: string;
  action: string;
  performedBy: string;
  targetId: string;
  details: string;
  timestamp: string;
}

export interface AdminAnalytics {
  dailyActiveUsers: number;
  totalAppointments: number;
  totalHospitals: number;
  totalDoctors: number;
  activeEmergencies: number;
  totalRevenue: number;
  hospitalVisitsCount: number;
  emergencyCallsCount: number;
}

