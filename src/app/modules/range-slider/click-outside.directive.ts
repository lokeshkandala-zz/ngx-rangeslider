import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';
 
@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private elementRef : ElementRef) {
    }
 
    @Output()
    public clickOutside = new EventEmitter();
 
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(true);
        }
    }
}