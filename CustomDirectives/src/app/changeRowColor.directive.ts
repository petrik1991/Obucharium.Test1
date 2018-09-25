import { Directive, HostBinding } from "@angular/core";

@Directive({
    selector: "tr"
})

export class CdChangeColor{

    @HostBinding("class")
    bg: string = "";

    changeColor(row: number){
        this.bg = row % 2 != 1 ? "bg-success" : null;
    }
}