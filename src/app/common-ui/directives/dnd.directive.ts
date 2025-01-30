import { Directive, HostBinding, HostListener, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Directive({
  selector: '[dnd]',
  standalone:true,
})
export class DndDirective {
  @Output() fildeDropped = new EventEmitter();
  @HostBinding('class.fileover')
  fileover: boolean =false;

  @HostListener('dragover', ['$event'] )
  onDragOver(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    console.log(event)

    this.fileover= true;
  }



  @HostListener('dragleave', ['$event'] )
  onDragleave(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    console.log(event)

    this.fileover = false;
  }


  @HostListener('onDrop', ['$event'] )
  onDrop(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    console.log(event)

    this.fileover = false;
    //@ts-ignore
    this.fildeDropped.emit(event.dataTransfer?.files[0]);
  }


  
  constructor() { }


}
