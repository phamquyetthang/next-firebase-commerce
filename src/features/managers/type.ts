export interface IAdminDb {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateAdminInput
  extends Pick<IAdminDb, "email" | "password"> {}
