export interface IDocDb {
  id: string;
  deleted_at: string;
  created_at: {
    seconds: number;
    nanoseconds: number;
  };
  updated_at: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface IPaginationRes<T> {
  meta: {
    total: number;
  };
  data: Array<T>;
}
