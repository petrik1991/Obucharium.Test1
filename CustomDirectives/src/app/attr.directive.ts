import {Directive, EventEmitter, Input, Output, HostBinding, HostListener, SimpleChange} from "@angular/core";

    @Directive({
        selector:"input[cd-attr]"
    })
    
    export class CdAttrDirective{
    
        @Input("cd-attr")
        property: string;
    
        @HostBinding("value")
        categoryValue: string = "";
    
        @Output("cd-attrChange")
        update = new EventEmitter<string>();
    
        @HostListener("input", ["$event.target.value"])
        onUpdate(value: string){
            this.categoryValue = value;
            this.update.emit(value);
        }
    
        ngOnChanges(changes: {[property: string]: SimpleChange}){
            let change = changes["property"];
            if(change.currentValue != this.categoryValue){
                this.categoryValue = change.currentValue || "";
            }
        }
    }