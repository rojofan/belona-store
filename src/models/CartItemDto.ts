import {ProductDto} from "@/models/ProductDto";

export class CartItemDto extends ProductDto {
    quantity: number = 0;
}