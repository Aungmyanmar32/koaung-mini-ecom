import { Products } from "@prisma/client";

export interface ProductState {
  isLoading: boolean;
  items: Products[];
  error: Error | null;
}
