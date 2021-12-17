import { Directive, ElementRef, HostListener, Input, Output, Renderer2, TemplateRef, ViewContainerRef,EventEmitter, OnInit, AfterContentChecked, AfterContentInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appTypeChecker]'
})
export class TypeCheckerDirective implements OnDestroy  {
  @Input() sourceElement:HTMLElement | undefined;
  @Input() defaultText:string ='';
  @Input() timer:number=60;
  wrongWords:number = 0;
  totalWords:number = 0;
  @Output() onChange = new EventEmitter<{totalWords:number,wrongWords:number,timer:number}>();
  timerObj:any;

  constructor(
    private elementRef:ElementRef,
    private renderer:Renderer2
  ) {}
  
  @HostListener('keyup') onKeyUp() {
    const text:string = this.elementRef.nativeElement?.value;
    if(text.trim()){
      let textArray = text.split(" ");
      let defaultTextArray = this.defaultText.split(" ");
      //let wrongWords = 0;
      this.wrongWords = 0;
      for(let _index in textArray){
        if(textArray.length > this.defaultText.split(" ").length){
          this.reset();
          break;

        }
        if(+_index == (textArray.length - 1)){
          defaultTextArray[_index] = '<span style="color:#b3b3b3;">'+defaultTextArray[_index]+'</span>';
        }else{
          if(textArray[_index]==defaultTextArray[_index]){
            defaultTextArray[_index] = '<span style="color:green;">'+defaultTextArray[_index]+'</span>';
          }else{
            defaultTextArray[_index] = '<span style="color:red;">'+defaultTextArray[_index]+'</span>';
            this.wrongWords++;

          }
        }
      }
      this.onChange.emit({
        totalWords:this.defaultText.split(" ").length,
        'wrongWords':this.wrongWords,
        timer:this.timer
      });

      if(this.timerObj===undefined){
        this.startTimer();

      }
      this.renderer.setProperty(this.sourceElement, 'innerHTML', defaultTextArray.join(" "));
    }
  }

  startTimer(){
    this.timerObj = setInterval(()=>{
      this.timer--;
      if(this.timer < 1){
        this.timer = 0;
        clearInterval(this.timerObj);
        this.reset();
      }

      this.onChange.emit({
        totalWords:this.defaultText.split(" ").length,
        'wrongWords':this.wrongWords,
        timer:this.timer
      });
    },1000);

  }
  ngOnDestroy(): void {
      clearInterval(this.timerObj);
  }

  reset(){
    if(this.timerObj !== undefined){
      clearInterval(this.timerObj);
    }
    this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'disabled');
    
  }

  

}
