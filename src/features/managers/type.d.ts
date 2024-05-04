import { IDocDb } from "../type";

export interface ICreateAdminInput {
  email: string;
  password: string;
  isActive: boolean;
}

export interface IAdminDb extends ICreateAdminInput, IDocDb {}

export interface IAdminDoc extends ICreateAdminInput, Omit<IDocDb, "id"> {}
