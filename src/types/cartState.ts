import { Products } from "@prisma/client";

export interface Cart extends Products {
  quantity: number;
}

export interface CartState {
  items: Cart[];
  isLoading: boolean;
  error: Error | null;
}
export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
export interface Option extends BaseOption {
  payload: Cart[];
}

export interface Option2 extends BaseOption {
  orderId: string;
}
