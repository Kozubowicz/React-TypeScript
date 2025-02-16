import { Product } from '../product';

export type CartDataItem = Product & { quantity: number };
