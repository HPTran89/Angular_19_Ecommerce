export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: dimension;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: metaDetail;
    images: string[];
    thumbnail: string;
}

export interface review {
    rating: number,
    comment: string,
    date: string,  //"2024-05-23T08:56:21.618Z",
    reviewerName: string,
    reviewerEmail: string,
}

interface dimension {
    width: number,
    height: number,
    depth: number
}
interface metaDetail {
    createdAt: string,
    updatedAt: string,
    barcode: string,
    qrCode: string
}