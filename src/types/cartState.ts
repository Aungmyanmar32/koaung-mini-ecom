import { Products } from "@prisma/client";

export interface Cart extends Products {
  quantity: number;
}

export interface CartState {
  items: Cart[];
  isLoading: boolean;
  error: Error | null;
}
