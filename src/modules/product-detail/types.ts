export interface Comment {
    id?: string;
    content: string;
    parentCommentId?: string;
    productId: string;
    createtime: string;
    author?: string;
    replies?: Comment[]
}

export interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
}