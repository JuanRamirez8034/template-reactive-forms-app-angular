import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export interface ConfigErrors{
  name:string;
  message:string;
}

export interface FormGroupMessageErrors{
  form:FormGroup;
  inputName:string;
  handleErrors:ConfigErrors[];
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public fullNameRegx : string = '([a-zA-ZÀ-ÿ\u00f1\u00d1\\s]{3,120})'; //regx para el nombre
  public emailRegx    : string = "^[a-zA-Z0-9\u00f1\u00d1._+-]+@[a-z0-9.-]+\\.+[a-z]{2,4}$";//regx para email

  constructor() { }

  // validador personalizado (ejemplo, no puede ser "Juancito22")
  public customValidatorUser(control: FormControl): null | object {

    const value = control.value?.trim();

    if (value === '' || value === 'Juancito22' || value === undefined) {
      return {
        userErr: true
      };
    }

    return null;
  }

  // validador de campos iguales (recibe dos campos de tipo "string" que representan los nombres de los inputs)
  public equalInputValues(field1:string, field2:string){

    // se retorna una funcion que recibe como parametros un "formGroup"
    // a su vez la funcion puede retornar "null" o un error de tipo "validationErrors"
    return (formGroup:AbstractControl):ValidationErrors | null=> {
      
      // si los campos no son iguales se retorna un error
      if(formGroup.get(field1)?.value !== formGroup.get(field2)?.value){

        // añadiendo error al campo 2 (campo de compararción)
        formGroup.get(field2)?.setErrors({equalInput1:false});

        return{
          equalInput:false
        };
      }

      // eliminando los errores del campo 2
      formGroup.get(field2)?.setErrors(null);

      // si todo está bien se retorna "null"
      return null;
    };

  }

  
  // funcion para comprobar errores y retornar los mensajes personalizados
  public showMessajeErrors(FGErrs:FormGroupMessageErrors):string{

    // destructuramos el objeto para conseguir:
    // - El formulario
    // - Nombre del campo a estudiar
    // - Arreglo con las configuraciones de los mensajes y sus errores
    const {form, inputName, handleErrors} = FGErrs;

    // conseguimos el error actual del elemento
    const inputErrors = form.get(inputName)?.errors;

    // recorremos el arreglo de configuracion de errores y si coincide 
    // alguno con el error del input se retorna el mensaje de error de dicho error
    // [errorName, errorMessage]
    for (const anError of handleErrors) {
      if(inputErrors?.[anError.name] || inputErrors?.[anError.name] === false || inputErrors?.[anError.name] === null){
        return anError.message;
      }
    }

    // si no hay coincidencia retornamos string vacio
    return '';

  }
}
