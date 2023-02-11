import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class SwitchesComponent implements OnInit {

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

  // inyectando el servicio del formulario reactivo
  constructor(private FB : FormBuilder) { }

  // objeto del formulario
  public switchesReactiveForm : FormGroup = this.FB.group({
    gender:['M', [Validators.required]],
    notification:[true, [Validators.required]],
    terms:[false, [Validators.requiredTrue]]
  });

  // objeto de persona
  public person : Person = {
    gender:'F',
    notifications:false
  };

  // añadiendo valoes por defecto al formulario
  ngOnInit(): void {
    // reseteando el formulario con valores por defecto
    this.switchesReactiveForm.reset({
      ...this.person,//valores del objeto persona
      terms:false//terminos en falso
    });

    // suscribiendonos al observable de los cambios en el formulario para obtener
    // los vaores de los campos y jugar con ellos a nuestro favor
    this.switchesReactiveForm.valueChanges.subscribe(formValues =>{
      console.log('Se registro un cambio, observando el cambio',formValues);      
    });
  }

  // función para guardar la data
  public save(){
    // revisando que el formulario esté valido
    if(this.switchesReactiveForm.invalid){
      this.alertConfig={
        text:'Fields requred',
        typeAlert:'warning',
        showAlert:true,
        showSpinner:false
      };
      this.switchesReactiveForm.markAllAsTouched;
      this.hideAlert(2000);
      return;
    }

    // asignando los valores al objeto persona
    const FormValues = {...this.switchesReactiveForm.value};
    
    delete FormValues.terms;//eliminando los termins del objeto

    // reasignando los valores
    this.person = FormValues;

    this.alertConfig = {
      showAlert:true,
      showSpinner:true,
      text:'Processing data...',
      typeAlert:'info'
    }
    
    setTimeout(() => {
      this.alertConfig = {
        showAlert: true,
        showSpinner: false,
        text: 'Data reseted',
        typeAlert: 'success'
      };
      this.hideAlert(2000);

      
      this.switchesReactiveForm.reset();
    }, 3000)
  }

}
