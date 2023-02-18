import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, Validator } from '@angular/forms';
import { ValidatorService } from '../../shared/validator/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //variable para el formulario
  public loginForm : FormGroup; 

  // inyectando el sevicio de form builder para utilzar los formularios reactivos
  // inyectando las validaciones y expreciones personalizadas del servicio de validator
  constructor(private fb : FormBuilder, private customService : ValidatorService) {

    //construyendo el formulario
    this.loginForm = this.fb.group({
      fullName:[null, [Validators.required, Validators.pattern(this.customService.fullNameRegx), Validators.maxLength(120)]],
      email:[null, [Validators.required, Validators.pattern(this.customService.emailRegx)]],
      userName:[null, [Validators.required, Validators.minLength(3),this.customService.customValidatorUser]],

      // campos de contraseña (para realizar la compararcion de contraseñas se añade la validacion en el formulario)
      // ya que la la evaluacion se debe realizar en ambos campos simultaneamente
      password:[null, [Validators.required, Validators.minLength(6)]],
      repeatPassword:[null, [Validators.required]]
    },
    {// vaidaciones que se añaden al formulario en general
      validators:[this.customService.equalInputValues('password', 'repeatPassword')],//arreglo de funciones de validaciones para el formulario
    });

  }

  // funcion para validar y mostrar los mesajes de error (tocado y no validado)
  public validField(fieldName:string){
    return this.loginForm.controls[fieldName]?.touched && this.loginForm.controls[fieldName]?.errors;
  }


}
