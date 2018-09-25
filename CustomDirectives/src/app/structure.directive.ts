import {Directive, Input, TemplateRef, ViewContainerRef, IterableDiffer, IterableDiffers} from "@angular/core";

@Directive({
    selector:"[cdForOf]"
})

export class CdStructureDirective{

    differ: IterableDiffer<any>;

    constructor(private container: ViewContainerRef, private template: TemplateRef<Object>,
                private differs: IterableDiffers){}

    @Input("cdForOf")
    products: any;

    ngOnInit(){
        this.differ = this.differs.find(this.products).create();
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.products);
        if (changes != null) {
            changes.forEachAddedItem(added => {
                let context = {
                    $implicit: added.item,
                    index: added.currentIndex,
                    odd: added.currentIndex % 2 == 1,
                    func: this.getClass()
                }
                this.container.createEmbeddedView(this.template, context);
            });
        }
    }

    getClass(){
        return "bg-info";
    }
}