import { Document, Types } from "mongoose";

export interface Books extends Document {
  title: string;
  content: string;
  author: string;
  price: string;
  createdAt?: Date;
}

export interface PaginatedBooks {
  items: Books[];
  total: number;
}