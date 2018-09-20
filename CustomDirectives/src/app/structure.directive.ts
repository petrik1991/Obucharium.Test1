import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
    selector:"[cdForOf]"
})

export class CdStructureDirective{

    constructor(private container: ViewContainerRef, private template: TemplateRef<Object>){}

    @Input("cdForOf")
    products: any;

    ngOnInit(){
        this.container.clear();

        this.products.forEach((e, i) => {
            let context = {
                $implicit: e,
                index: i,
                odd: i % 2 == 1,
                func: this.getClass()
            }

            this.container.createEmbeddedView(this.template, context);
        });
    }

    getClass(){
        return "bg-info";
    }
}