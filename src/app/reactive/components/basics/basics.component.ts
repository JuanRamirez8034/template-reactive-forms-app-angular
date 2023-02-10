import { Component } from '@angular/core';
import { AlerConfig } from 'src/app/components/interfaces/interfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.css']
})
export class BasicsComponent {

  // variables para el alert (estas propiedades provienen del archivo de interfaces personalizadas)
  public alertConfig: AlerConfig = {
    showSpinner: true,
    showAlert: false,
    text: ''
  }

  // funcion para descartar el alerta
  private hideAlert(time:number): void {
    setTimeout(() => this.alertConfig = { text: '', showAlert: false, showSpinner: false }, time);
  }

  // creando objeto para definir el tipo y estructura del formuario (1ra forma)
  public _basicReactiveForm: FormGroup = new FormGroup({
    name: new FormControl(
      'New product',                                 //value del input por defecto
      [Validators.required, Validators.minLength(3)],//validadores sincronos
      []                                             //validadores asincronos
    ),
    price: new FormControl(null),
    stock: new FormControl(null),
  });

  // creando objeto para definir el tipo y estructura del formuario (2da forma) usando "FormBuilder"
  public basicReactiveForm: FormGroup = this.FB.group({
    name: [
      '',                                            //value por defecto del input
      [Validators.required, Validators.minLength(3)],//validadores sincronos (si solo es uno se puede pasar sin los corchetes)
      []                                             //validadores asincornos (si solo es uno se puede pasar sin los corchetes)
    ],
    price: [null, [Validators.required, Validators.min(0)]],
    stock: [null, [Validators.required, Validators.min(0)]]
  });

  // inyectando el servicio de "FormBuilder"
  constructor(private FB: FormBuilder) { }

  // funcion para determinar si se muestra o no el mensaje de error de los inputs
  public showValidError(field:string):boolean | null {
    return this.basicReactiveForm.controls[field]?.errors && this.basicReactiveForm.controls[field]?.touched;
  }


  // funcion para verificar el formulario al enviar y guardar la información
  public save():void{
    // verificando que el formulario esté valido, si no lo está marcamos todos los campos
    // como tocados para mostrar todos los mensajes y salimos
    if(this.basicReactiveForm.invalid){
      this.alertConfig = {
        showAlert:true,
        showSpinner:false,
        text:'Invalid fiels',
        typeAlert:'danger'
      }
      this.hideAlert(2000);
      this.basicReactiveForm.markAllAsTouched();//marcanddo todo como tocado
      return;
    }

    // funcionalidad en caso exitoso
    this.alertConfig = {
      showAlert:true,
      showSpinner:true,
      text:'Processing data',
      typeAlert:'info'
    }

    setTimeout(()=>{
      this.alertConfig = {
        showAlert:true,
        showSpinner:false,
        text:'Data reseted',
        typeAlert:'success'
      }
      this.hideAlert(3000);
      this.basicReactiveForm.reset();//restableciendo el formulario a su estado original
    }, 2000);
    
  }

}
