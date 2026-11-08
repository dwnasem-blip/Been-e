/**
 * Application Types
 * Comprehensive type definitions for the WAIN app
 */

// User & Auth Types
export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  avatar?: string;
  language: "ar" | "en";
  createdAt: string;
  updatedAt: string;
}

// Items & Storage Types
export interface Item {
  id: string;
  userId: string;
  name: string;
  description?: string;
  location?: string;
  category: ItemCategory;
  imageUrl?: string;
  tags?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export enum ItemCategory {
  DOCUMENTS = "documents",
  ELECTRONICS = "electronics",
  CLOTHING = "clothing",
  FURNITURE = "furniture",
  VALUABLES = "valuables",
  MISCELLANEOUS = "miscellaneous",
}

// Document Types
export interface Document {
  id: string;
  userId: string;
  itemId?: string;
  documentType: DocumentType;
  imageUrl: string;
  extractedData: DocumentExtractedData;
  originalData: DocumentExtractedData;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum DocumentType {
  RECEIPT = "receipt",
  WARRANTY = "warranty",
  INVOICE = "invoice",
  CERTIFICATE = "certificate",
  CONTRACT = "contract",
  IDENTIFICATION = "identification",
  OTHER = "other",
}

export interface DocumentExtractedData {
  storeName?: string;
  date?: string;
  amount?: number;
  currency?: string;
  items?: DocumentItem[];
  warranty?: WarrantyInfo;
  merchant?: string;
  invoiceNumber?: string;
  notes?: string;
}

export interface DocumentItem {
  name: string;
  quantity?: number;
  price?: number;
}

// Warranty Types
export interface Warranty {
  id: string;
  userId: string;
  itemId?: string;
  productName: string;
  warrantyStartDate: string;
  warrantyEndDate: string;
  durationMonths: number;
  provider?: string;
  documentUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WarrantyInfo {
  provider?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
}

// Subscription Types
export interface Subscription {
  id: string;
  userId: string;
  name: string;
  provider: string;
  amount: number;
  currency: string;
  frequency: SubscriptionFrequency;
  nextBillingDate: string;
  lastBillingDate?: string;
  isActive: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum SubscriptionFrequency {
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  SEMI_ANNUAL = "semi_annual",
  ANNUAL = "annual",
}

// Loan Types
export interface Loan {
  id: string;
  userId: string;
  itemName: string;
  borrowerName: string;
  loanDate: string;
  expectedReturnDate?: string;
  actualReturnDate?: string;
  status: LoanStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum LoanStatus {
  PENDING = "pending",
  RETURNED = "returned",
  OVERDUE = "overdue",
}

// Reminder Types
export interface Reminder {
  id: string;
  userId: string;
  title: string;
  description?: string;
  type: ReminderType;
  relatedId?: string;
  dueDate: string;
  isCompleted: boolean;
  notificationEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum ReminderType {
  WARRANTY_EXPIRY = "warranty_expiry",
  LOAN_OVERDUE = "loan_overdue",
  SUBSCRIPTION_RENEWAL = "subscription_renewal",
  CUSTOM = "custom",
}

// Notification Types
export interface NotificationRecord {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
}

export enum NotificationType {
  WARRANTY = "warranty",
  LOAN = "loan",
  SUBSCRIPTION = "subscription",
  SYSTEM = "system",
  CUSTOM = "custom",
}

// Search Types
export interface SearchResult {
  id: string;
  type: "item" | "document" | "warranty" | "subscription" | "loan";
  title: string;
  subtitle?: string;
  imageUrl?: string;
  relevance: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Data Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

export interface AddItemFormData {
  name: string;
  description?: string;
  location?: string;
  category: ItemCategory;
  image?: {
    uri: string;
    type: string;
    name: string;
  };
  tags?: string[];
  notes?: string;
}

// Navigation Types
export type RootParamList = {
  "index": undefined;
  "auth/login": undefined;
  "auth/register": undefined;
  "auth/forgot-password": undefined;
  "tabs": undefined;
  "tabs/home": undefined;
  "tabs/add-item": undefined;
  "tabs/documents": undefined;
  "tabs/warranties": undefined;
  "tabs/subscriptions": undefined;
  "tabs/loans": undefined;
  "tabs/search": undefined;
  "tabs/profile": undefined;
  "modal-item-details": { itemId: string };
  "modal-add-item": undefined;
};

// Error Types
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "AppError";
  }
}

// State Types
export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
}

export interface ItemsState {
  items: Item[];
  isLoading: boolean;
  error?: string;
  total: number;
}
