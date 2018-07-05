import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appError]'
})
export class ErrorDirective {

  constructor(private element: ElementRef) { }

  @Input() set appError(condition: boolean){
    if(condition){
        this.element.nativeElement.style.color = 'red';
    }else{
      this.element.nativeElement.style.color = '';
    }
  }
}
