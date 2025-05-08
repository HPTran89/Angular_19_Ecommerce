export interface ProductModel {
    productId: number;
    productSku: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productShortName: string;
    createdDate: Date;
    categoryName: string;
    categoryId: number;
    productImageUrl: string;

}

export type Category = {
    categoryId: number;
    categoryName: string;
    parentCategoryId: number;
    userId: number;
}

export class Customer {
    custId: number;
    name: string;
    MobileNo: string;
    Password: string;

    /**
     *
     */
    constructor() {
        this.custId = 0;
        this.name = '';
        this.MobileNo = '';
        this.Password = '';
    }
}

export class LoginCustomer {
    UserName: string;
    UserPassword: string;
    /**
     *
     */
    constructor() {
        this.UserName = '';
        this.UserPassword = '';
    }
}

export class CartModel {
    CartId: number;
    ProductId: number;
    CustId: number;
    Quantity: number;
    AddedDate: Date;
    constructor() { 
        this.CartId = 0;
        this.ProductId = 0;
        this.CustId = 0;
        this.Quantity = 0;
        this.AddedDate = new Date();
    }
}