import { IDocDb } from "../type";

export interface ICreateAdminInput {
  email: string;
  password: string;
  isActive: boolean;
}

export interface IAdminDb extends ICreateAdminInput, IDocDb {}
