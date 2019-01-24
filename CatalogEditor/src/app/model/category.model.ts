export class Category{
    
    constructor(
        public name: string,
        public isCollapsed: boolean,
        public subcategory?: Category[]
    ){}
}
