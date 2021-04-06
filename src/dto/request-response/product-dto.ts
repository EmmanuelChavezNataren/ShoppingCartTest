import { Colors } from "../colors-dto";
import { GeneralResponse } from "./general-response";

export class Product extends GeneralResponse {
    data?: ProductData[];
    constructor(){   
        super();
        this.data = new Array<ProductData>();     
    }
}

export class ProductData {
    id?: number;
    sku?: string;
    brand?: string;
    product_name?: string;
    product_image?: string;
    product_price?: string;
    discount?: string;
    is_favorite?: boolean;
    score?: number;
    description?: string;
    colors?: Colors[];
    color?: Colors;
    reviews?: string;

    constructor(){
        this.colors = new Array<Colors>();
        this.color = new Colors();
    }
}