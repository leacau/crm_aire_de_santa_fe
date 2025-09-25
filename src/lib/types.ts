export interface User {
  uid: string;
  fullName: string;
  email: string;
  role: 'asesor' | 'jefe' | 'admin';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatarUrl?: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  email: string;
  preferredChannel: 'tel' | 'mail' | 'whatsapp';
}

export interface Account {
  accountId: string;
  displayName: string;
  cuitDni?: string;
  industry: 'comercio' | 'servicios' | 'gobierno' | 'otro';
  city: string;
  province: string;
  website?: string;
  notes?: string;
  ownerUid: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'activo' | 'inactivo';
  contacts: Contact[];
}

export interface Opportunity {
  opportunityId: string;
  accountId: string;
  accountName: string; // denormalized for easy display
  ownerUid: string;
  stage: 'lead' | 'contacto' | 'propuesta' | 'negociación' | 'ganado' | 'perdido';
  source: 'referido' | 'inbound' | 'llamado' | 'evento' | 'redes';
  platform: 'radio' | 'tv' | 'digital' | 'redes' | 'mixto';
  estAmount: number;
  closeProbability: number; // 0-1
  expectedCloseDate: Date;
  nextAction: string;
  nextActionDate: Date;
  lostReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderPlatform {
  type: 'radio' | 'tv' | 'digital' | 'redes';
  startDate: Date;
  endDate: Date;
  grossAmount: number;
  discount: number;
  netAmount: number;
}

export interface Order {
  orderId: string;
  accountId: string;
  opportunityId: string;
  platforms: OrderPlatform[];
  billingStatus: 'pendiente' | 'parcial' | 'completo';
  renewalDate: Date;
  attachments: string[]; // storage paths
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  activityId: string;
  entityType: 'account' | 'opportunity' | 'order';
  entityId: string;
  type: 'llamada' | 'email' | 'reunión' | 'nota';
  summary: string;
  when: Date;
  createdBy: string; // uid
  nextAction?: string;
  nextActionDate?: Date;
  createdAt: Date;
}
