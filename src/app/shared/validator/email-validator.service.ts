import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {
  //asyncValidador es la implementacion que permite la realizacion de validaciones asincornas

  // url del backend
  private _urlBackend : string = environment.backendUrl;
  
  // inyeccion del cliente http
  constructor(private http:HttpClient) { }

  // funcion que permite la realizacion de la validacion async
  // recibe un control (ya que se llama desde un control) como parametro
  // retorna una promesa u observable que a su vez deben retornar "null" o "ValidationErrors"
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const email = control.value ?? '';
    return this.http.get<any[]>(`${this._urlBackend}/users?q=${email}`) //observable que retorna un arreglo de objetos
      .pipe(//transformando la respuesta

        delay(2000),//operador para detener el codigo durante 2s

        map(resp => {//recibimos la respuesta y tranformamos las respuestas en null o ValidationErrors

          console.log('Respuesta de validacion email', resp);
          

          // en caso de que exista un elemento "ValidationErrors" (error, existe un correo identico)
          if(resp.length > 0){
            return {
              aviableEmail:false
            };
          }
          
          // en caso de respuesta sin elementos "null" (todo bien)
          return null;

        })

    );
  }

}
