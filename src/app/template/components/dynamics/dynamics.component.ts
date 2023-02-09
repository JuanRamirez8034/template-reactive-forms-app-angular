import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlerConfig } from 'src/app/components/interfaces/interfaces';
import {v4 as uuid4} from 'uuid';

// interface de los datos de persona
interface Person{
  name  : string;
  games : Game[];
}

interface Game{
  name  : string;
  id: string;
}

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
  styleUrls: ['./dynamics.component.css']
})
export class DynamicsComponent {

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


  // objeto de persona, contiene la informacion que se va ingresando en el formulario
  public person : Person = {
    name: '',
    games: []
  };

  //varibale para capturar la información del input de nuevos juegos
  public newGame : string = '';

  // instancia del formulario
  @ViewChild('dynamicTemplateForm') public dynamicForm !: NgForm;


  public save():void{
    console.log('Campos del formulario',this.dynamicForm.control.value, 'datos del objeto persona', this.person);
    // validando los datos 
    this.person.name = this.dynamicForm.controls['name']?.value?.trim() || '';

    if(this.person.name === ''){//si el campo está vacio

      this.alertConfig = {//configuracion del alert a mostrar
        showAlert:true, 
        showSpinner:false, 
        text:'The name field is empty', 
        typeAlert:'warning'
      };
  
      this.hideAlert(2000);//ocultando alerta luego de 2s

      return;
    }

    if(this.person.games.length <= 0){//si no hay juegos añadidos salir

      this.alertConfig = {//configuracion del alert a mostrar
        showAlert:true, 
        showSpinner:false, 
        text:'The games list is empty', 
        typeAlert:'warning'
      };
  
      this.hideAlert(2000);//ocultando alerta luego de 2s

      return;
    }

    // funcionalidad luego de procesar los datos

    this.alertConfig = {//configuracion del alert a mostrar
      showAlert:true, 
      showSpinner:true, 
      text:'Process data...', 
      typeAlert:'info'
    };

    setTimeout(()=>{
      this.alertConfig = {//configuracion del alert a mostrar
        showAlert:true, 
        showSpinner:false, 
        text:'Data saved', 
        typeAlert:'primary'
      };
      this.hideAlert(2000);

      // limpiar los datos y restablecer formulario
      setTimeout(()=>{
        this.person.name = '';//restbleciendo el campo de persona
        this.person.games = [];
        this.dynamicForm.resetForm();//restableciendo el formulario

        this.alertConfig = {//configuracion del alert a mostrar
          showAlert:true, 
          showSpinner:false, 
          text:'Data reseted', 
          typeAlert:'success'
        };
        this.hideAlert(1500);

      }, 10000);

    }, 4000);
  }

  // agregar juego
  public addGame():void{

    this.newGame = this.newGame.trim(); // limpiando el contenido en blanco de los lados
        
    if(this.newGame===''){//si el campo está vacio  salir 

      this.alertConfig = {
        showAlert:true, 
        showSpinner:false, 
        text:'The game field is empty', 
        typeAlert:'warning'
      };

      this.hideAlert(2000);//ocultando alerta luego de 2s

      return;
    }   
    
    if(this.person.games.find( element => element.name === this.newGame) !== undefined)return;//si el nombre ya existe salimos

    const newGame : Game = {name:this.newGame, id: uuid4()};//generando el nuevo elemento

    this.person.games.push(newGame);//añadiendo el nuevo elemento al arreglo

    this.newGame = '';// restableciendo el campo del nuevo input

    console.log(this.person.games);

    this.alertConfig = {//configuracion del alert a mostrar
      showAlert:true, 
      showSpinner:false, 
      text:'Game added', 
      typeAlert:'primary'
    };

    this.hideAlert(1500);//ocultando alerta luego de 2s
    
  }

  // eliminar juego añadido
  public removeGame(id:string):void{

    if(typeof(id) !== "string")return;//si la id es distinta a un string, salir

    console.log(id);

    let tempArr : Game[] = []; //arreglo temporal
    
    // recorriendo el arreglo almacenando un arreglo temporal
    // los elementos que no coinciden
    for (const element of this.person.games) {
      if(element.id !== id){
        tempArr.push(element);
      }
    }

    this.person.games = tempArr;//agregando el arreglo temporal en el original

    this.alertConfig = {//configuracion del alert a mostrar
      showAlert:true, 
      showSpinner:false, 
      text:'Game removed', 
      typeAlert:'warning'
    };

    this.hideAlert(2000);//ocultando alerta luego de 2s
    
    console.log(tempArr);
  }



}
