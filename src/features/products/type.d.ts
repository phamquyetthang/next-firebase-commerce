import { ICategoryDb } from "../categories/type";
import { IAdminDb } from "../managers/type";
import { IDocDb } from "../type";

export interface ICreateProductInput {
  name: string;
  slug: string;
  description: string; // html
  createdId: string;
  images?: string[]; // url to storage firebase
  categoryIds: string[];
  properties: Array<{
    name: string;
    color?: string;
    size?: string;
    price: number;
  }>;
  defaultPrice?: number;
}

export interface IProductDb
  extends Omit<ICreateProductInput, "createdId" | "categoryIds">,
    IDocDb {
  created_by: IAdminDb;
  categories: ICategoryDb[];
}
export interface IProductDoc extends Omit<IProductDb, "id"> {}
