import { Component } from '@angular/core';
import { AlerConfig } from 'src/app/components/interfaces/interfaces';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { v4 as uuid4} from "uuid";


@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
  styleUrls: ['./dynamics.component.css']
})
export class DynamicsComponent {

  // objeto alert para controlar el alerta
  public alertConfig: AlerConfig = {
    showAlert: false,
    showSpinner: false,
    text: ''
  }

  // funcionalidad para el alert
  public hideAlert(time_ms: number): void {
    setTimeout(() => { this.alertConfig = { showAlert: false, text: '', showSpinner: false }; }, time_ms);
  }
  
  // instancia de formBuider para crear el identificador de nuestro formulario
  public dynamicReactiveForm : FormGroup = this.FB.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    games: this.FB.array([ /*/arreglo de controles*/], [Validators.required])
  });

  // instancia para el nuevo control
  public gameControl : FormControl = this.FB.control('', [Validators.required, Validators.minLength(3)]);

  // inyectando servicio de FormBuilder
  constructor(private FB : FormBuilder) { }

  // funcion para determinar si el campo está valido o no y mostrar el mensaje de error
  public showValidError(fieldName:string):boolean | null{
    return this.dynamicReactiveForm.controls[fieldName]?.errors && this.dynamicReactiveForm.controls[fieldName]?.touched ;
  }

  // fucion para validar la existencia de juegos añadidos y determinar si mostrar el mensaje de error
  public showValidErrorGames(fieldName:string):boolean | null{
    return this.arrayGamesControls?.controls.length <= 0 && this.gameControl.touched;
  }

  // funcion para vobtener los controles del arreglo de controles (games) definido en el objeto del formulario
  public get arrayGamesControls(){
    //retornar el arreglo de controles convertido a un FormArray
    return this.dynamicReactiveForm.get('games') as FormArray; 
    // return this.dynamicReactiveForm.controls['games'] as FormArray;
  }

  // funcion para agregar nuevo juegos (añadir los nuevos controles al ArrayControls)
  public addGame():void{
    const gameName : string = this.gameControl.value.trim() ?? '';//guardando y limpiando lo recolectado desde el control
    // validando que el control texto y no solo espacios en blanco, si es así salir
    if(this.gameControl.invalid || gameName===''){
      this.alertConfig = {
        showAlert:true,
        showSpinner:false,
        text:'Favorit game field is empty',
        typeAlert:'warning'
      }
      this.hideAlert(2000);
      return;
    }

    // revisando si el juego ya existe
    if(this.arrayGamesControls.controls.find(element => element.value === gameName) !== undefined){
      this.alertConfig = {
        showAlert:true,
        showSpinner:false,
        text:'Game already exist',
        typeAlert:'warning'
      }
      this.hideAlert(2000);
      return;
    }

    // agregando el nuevo elemento al FormArray
    this.arrayGamesControls.push(this.FB.control(gameName, [Validators.required, Validators.minLength(3)]));
    // this.arrayGamesControls.push(new FormControl(gameName, [Validators.required, Validators.minLength(3)]));
    
    // resetenado el control
    this.gameControl.reset();
  }

  // funcion para eliminar juego
  public removeGame(id:number):void{
    this.arrayGamesControls.removeAt(id);
  }

  // funcion para guaradar la información
  public save():void{
    // verificando que el formulario esté valido, si no lo está marcamos todos los campos
    // como tocados para mostrar todos los mensajes y salimos
    if(this.dynamicReactiveForm.invalid || this.arrayGamesControls.controls.length <=0){
      this.alertConfig = {
        showAlert:true,
        showSpinner:false,
        text:'Invalid fiels',
        typeAlert:'danger'
      }
      this.hideAlert(2000);
      this.dynamicReactiveForm.markAllAsTouched();//marcanddo todo como tocado
      this.gameControl.markAsTouched();
      return;
    }


    // realizando las operaciones de guardado
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

      this.arrayGamesControls.clear();
      this.dynamicReactiveForm.reset();
      this.gameControl.reset();
    }, 3000)
  }

}
