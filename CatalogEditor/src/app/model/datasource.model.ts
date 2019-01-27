import { Product } from './product.model';
import { Category } from './category.model';

export class DataSource{
    private productsData: Product[];
    private categoriesData: Category[];

    constructor(){
        
        this.categoriesData = new Array<Category>(
            new Category("Одежда, обувь, аксессуары", false, 
            new Array<Category>(new Category("Женская одежда", false, new Array<Category>(new Category("Верхняя", false)))))
        );

        this.productsData = new Array<Product>(
            new Product(1, "Юбка", 23.25, this.categoriesData[0], '../../assets/jeans.jpg', 4),
            new Product(2, "Кофта", 43.75, this.categoriesData[0], "", 3),
            new Product(3, "Шорты", 13.35, this.categoriesData[0], "", 5),
            new Product(4, "Джинсы", 3.05, this.categoriesData[0], '../../assets/jeans.jpg', 7),
            new Product(5, "Шарф", 13, this.categoriesData[0], "", 2),
            new Product(6, "Плащ", 33, this.categoriesData[0], "", 8)
        );
    }

    getProducts(): Product[]{
        return this.productsData;
    }

    getCategories(): Category[]{
        return this.categoriesData;
    }
}
