import { createContext } from "react";
import { Product } from "types";

const ProductContext = createContext<Product[]>([]);

export default ProductContext;
