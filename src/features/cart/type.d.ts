import { IProductDb } from "../products/type";

export interface ICartDoc {
  uuid: string;
  products: Array<{
    id: string;
    quantity: number;
    property: string;
    itemId: number
  }>;
  id?: string;
}

export interface ICartDataRes {
  id: string;
  products: Array<{ quantity: number; property: string; data?: IProductDb, itemId: number }>;
}
