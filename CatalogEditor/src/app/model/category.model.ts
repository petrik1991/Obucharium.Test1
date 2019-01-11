export class Category{
    
    constructor(
        public name: string,
        public subcategory?: Category[]
    ){}
}
