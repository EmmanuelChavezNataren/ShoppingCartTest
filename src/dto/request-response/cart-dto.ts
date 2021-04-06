import { GeneralResponse } from "./general-response";
import { ProductData } from "./product-dto";

export class Cart extends GeneralResponse {
    data?: ProductCart;
    constructor(){
        super();
        this.data = new ProductCart();
    }
}

export class ProductCart {
    products?: ProductData[];
    subtotal?: number;
    shipping?: number;
    total?: number;
    constructor(){
        this.products = new Array<ProductData>();  
    }
}