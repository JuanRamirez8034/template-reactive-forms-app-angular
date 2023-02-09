import { Component } from '@angular/core';
import { AlerConfig } from 'src/app/components/interfaces/interfaces';

interface Person{
  gender:string;
  notifications:boolean;
}

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent {

  // objeto alert para controlar el alerta
  public alertConfig : AlerConfig = {
    showAlert:false,
    showSpinner:false,
    text:''
  }

  // funcionalidad para el alert
  public hideAlert(time_ms:number):void{
    setTimeout(()=>{this.alertConfig = {showAlert:false, text:'', showSpinner:false};}, time_ms);
  }

  // objeto con las propiedades de la persona
  public person : Person ={
    gender : '',
    notifications:true
  }

  public termsAndConditions : boolean = false;//variable enlazada a los terminos del formulario

  public save(){
    this.alertConfig = {//configuracion del alert a mostrar
      showAlert:true, 
      showSpinner:true, 
      text:'Reseting the fields...', 
      typeAlert:'success'
    };

    this.hideAlert(2000);//ocultando alerta luego de 2s

    this.person.gender='';
    this.person.notifications=true;
    this.termsAndConditions =false;
  }

}
