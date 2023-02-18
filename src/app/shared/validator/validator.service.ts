import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

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
  
}
