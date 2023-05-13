import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit {
  @Input() public placeholder:string='';

  @Input() public initialValue:string='';

  @ViewChild('inputSearch') public input!:ElementRef<HTMLInputElement>;

  @Output() public wordsToTransfer:EventEmitter<string> = new EventEmitter();

  private debouncer = new Subject<string>();

  ngOnInit(): void {

    // if(this.initialValue!= undefined && null) this.input.nativeElement.value=this.initialValue

    this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe(
      (value)=>{
        // console.log('value del debouncer',value);
        this.wordsToTransfer.emit(value);
      }
    )
  }

  onValue(){
    const word = this.input.nativeElement.value;
    // console.log('palabra desde el searchbox',word)
    this.wordsToTransfer.emit(word);
  }

  triggerDebounce(){
    const words = this.input.nativeElement.value;
    this.debouncer.next(words);
  }
}
