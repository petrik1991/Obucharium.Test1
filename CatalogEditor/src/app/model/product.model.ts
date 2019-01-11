import { Category } from './category.model';

export class Product{
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public category: Category,
        public photo: string
    ){}
}
