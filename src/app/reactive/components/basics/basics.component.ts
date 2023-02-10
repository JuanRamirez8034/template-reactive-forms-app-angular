import { Component } from '@angular/core';
import { AlerConfig } from 'src/app/components/interfaces/interfaces';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.css']
})
export class BasicsComponent {

    // variables para el alert (estas propiedades provienen del archivo de interfaces personalizadas)
    public alertConfig : AlerConfig = {
      showSpinner : true,
      showAlert : false,
      text:''
    }
  
    // funcion para descartar el alerta
    private hideAlert():void{
      setTimeout(()=>this.alertConfig = {text:'', showAlert:false, showSpinner:false}, 1500);
    }
    
  constructor() { }


}
