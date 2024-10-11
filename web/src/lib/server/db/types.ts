/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Json = JsonValue;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [x: string]: JsonValue | undefined;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string>;

export interface Chat {
  id: Generated<number>;
  otherUserId: number;
  userId: number;
}

export interface EmailChangeRequest {
  code: string;
  expires: Timestamp;
  newEmail: string;
  userId: number;
}

export interface Event {
  address: string | null;
  attachments: Generated<Json>;
  content: string | null;
  date: string | null;
  header: string;
  id: Generated<number>;
  userId: number;
}

export interface EventTag {
  eventId: number;
  id: Generated<number>;
  tagId: number;
}

export interface Message {
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

export interface Post {
  attachments: Generated<Json>;
  content: string | null;
  date: Timestamp;
  header: string;
  id: Generated<number>;
  userId: number;
}

export interface PostTag {
  id: Generated<number>;
  postId: number;
  tagId: number;
}

export interface Product {
  author: string;
  description: string | null;
  id: Generated<number>;
  price: number;
  title: string;
}

export interface Session {
  expires: Timestamp;
  token: string;
  userId: number;
}

export interface Subscription {
  id: Generated<number>;
  subId: number;
  userId: number;
}

export interface Tag {
  id: Generated<number>;
  name: string;
}

export interface User {
  email: string;
  id: Generated<number>;
  info: string | null;
  isCreator: Generated<boolean>;
  name: string;
  passwordHash: string;
  personalSite: string | null;
  phone: string | null;
  surname: string | null;
  telegram: string | null;
  vk: string | null;
  workplace: string | null;
}

export interface DB {
  chat: Chat;
  emailChangeRequest: EmailChangeRequest;
  event: Event;
  eventTag: EventTag;
  message: Message;
  passwordRecovery: PasswordRecovery;
  pendingRegistration: PendingRegistration;
  post: Post;
  postTag: PostTag;
  product: Product;
  session: Session;
  subscription: Subscription;
  tag: Tag;
  user: User;
}
