import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input('showAlert') public showAlert : boolean = true;
  @Input('showSpinner') public showSpinner : boolean = true;
  @Input('text') public text : string = '';
  @Input('typeAlert') public typeAlert : string | undefined = 'info';
  @Input('typeSpiner') public typeSpiner : string | undefined = 'primary';
}
