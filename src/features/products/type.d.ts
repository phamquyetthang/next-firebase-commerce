import { ICategoryDb } from "../categories/type";
import { IAdminDb } from "../managers/type";
import { IDocDb } from "../type";

export interface IProperties {
  name: string;
  color?: string;
  size?: string;
  price: number;
  id: string;
  stripeId?: string;
}
export interface ICreateProductInput {
  name: string;
  slug: string;
  description: string; // html
  createdId: string;
  images?: string[]; // url to storage firebase
  categoryIds: string[];
  properties: Array<IProperties>;
  defaultPrice?: number;
  stripeId?: string;
}

export interface IProductDb
  extends Omit<ICreateProductInput, "createdId" | "categoryIds">,
    IDocDb {
  created_by: IAdminDb;
  categories: ICategoryDb[]; // not save to db
  categoryIds: string[];
}
export interface IProductDoc extends Omit<IProductDb, "id"> {}
