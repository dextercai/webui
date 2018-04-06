import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { TooltipPosition } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector : 'tooltip',
  templateUrl : 'tooltip.component.html',
  styleUrls : [ 'tooltip.component.css' ],
})
export class TooltipComponent {
  @Input('message') message: string;
  @ViewChild('tooltip') private tooltip: ElementRef;

  public isShowTooltip: Boolean;
  public tooltipMsgStyle: any;
  public tooltipSize: any;

  constructor(public translate: TranslateService) {}

  showTooltip($event) {
    this.isShowTooltip = $event;

    let screenW = document.body.clientWidth;
    let posX = this.tooltip.nativeElement.getBoundingClientRect().left;

    if((screenW - posX) > 420) {
      this.tooltipMsgStyle = {'left' : '0px'};
    }
    else if(posX > 420) {
      this.tooltipMsgStyle = {'right' : '0px'};
    }
    else {
      let diffX = 'calc( -45vw - ' + (posX - screenW/2) + 'px )';
      this.tooltipMsgStyle = {'left' : diffX};
    }    

    if(this.message.length < 35) {
      console.log(this.message.length);
      //this.tooltipMsgStyle = this.tooltipMsgStyle + "{'background-color' : 'blue'};"
    }
  }
}

  /* Working on dynamically resizing tooltips above...dkm*/


  

