/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string>;

export interface Chats {
  id: Generated<number>;
  otherId: number;
  userId: number;
}

export interface EmailChangeRequest {
  code: string;
  expires: Timestamp;
  newEmail: string;
  userId: number;
}

export interface Messages {
  chatId: number;
  content: string;
  date: Timestamp;
  id: Generated<number>;
  recipientId: number;
  senderId: number;
}

export interface PasswordRecovery {
  code: string;
  email: string;
  expires: Timestamp;
}

export interface PendingRegistration {
  code: string;
  email: string;
  expires: Timestamp;
  name: string;
  passwordHash: string;
}

export interface Product {
  author: string;
  description: string | null;
  id: Generated<number>;
  price: number;
  title: string;
}

export interface ProductOwnership {
  productId: number;
  userId: number;
}

export interface Session {
  expires: Timestamp;
  token: string;
  userId: number;
}

export interface User {
  avatarUrl: string | null;
  email: string;
  id: Generated<number>;
  name: string;
  passwordHash: string;
}

export interface DB {
  chats: Chats;
  emailChangeRequest: EmailChangeRequest;
  messages: Messages;
  passwordRecovery: PasswordRecovery;
  pendingRegistration: PendingRegistration;
  product: Product;
  productOwnership: ProductOwnership;
  session: Session;
  user: User;
}
