export interface ICartDoc {
  uuid: string;
  products: Array<{
    id: string;
    quantity: number;
    property: string
  }>;
  id?: string;
}