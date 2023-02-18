import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, Validator } from '@angular/forms';
import { ValidatorService } from '../../shared/validator/validator.service';
import { EmailValidatorService } from '../../shared/validator/email-validator.service';


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
  constructor(private fb : FormBuilder, private customService : ValidatorService, private emailValid : EmailValidatorService) {

    //construyendo el formulario
    this.loginForm = this.fb.group({
      fullName:[null, [Validators.required, Validators.pattern(this.customService.fullNameRegx), Validators.maxLength(120)]],
      email:[null, [Validators.required, Validators.pattern(this.customService.emailRegx)], [this.emailValid]],//el validador de email async es personalizado(email-validator.service)
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

  // getter para mostrar los mensajes de error del fullName
  get fullNameMessagErrors():string{
    return this.customService.showMessajeErrors({
      form:this.loginForm, 
      inputName:'fullName',
      handleErrors:[
        { name:'required',   message:'* The full name field is required' },
        { name:'maxlength',  message:'* The user max length is 120 chars' },
        { name:'pattern',    message:'* The full name format is invlaid' }
      ]
    });
  }

  // getter para mostrar los mensajes de error del userName
  get userNameMessagErrors():string{
    return this.customService.showMessajeErrors({
      form:this.loginForm, 
      inputName:'userName',
      handleErrors:[
        { name:'required',   message:'* The User name field is required' },
        { name:'minlength',  message:'* The user name min three chars' },
        { name:'userErr',    message:'* The user name not aviable' }
      ]
    });
  }

  // getter para mostrar los mensajes de error del email
  get emailMessagErrors():string{
    return this.customService.showMessajeErrors({
      form:this.loginForm, 
      inputName:'email',
      handleErrors:[
        { name:'required',     message:'* The email field is required' },
        { name:'pattern',      message:'* The email format is invalid' },
        { name:'aviableEmail', message:'* The email is not aviable' }
      ]
    });
  }

  // getter para mostrar los mensajes de error del password
  get passwordMessagErrors():string{
    return this.customService.showMessajeErrors({
      form:this.loginForm, 
      inputName:'password',
      handleErrors:[
        { name:'required',     message:'* The password field is required' },
        { name:'minlength',      message:'* The min password length is 6 chars' },
      ]
    });
  }

  // getter para mostrar los mensajes de error del repeatPassword
  get repeatPasswordMessagErrors():string{
    return this.customService.showMessajeErrors({
      form:this.loginForm, 
      inputName:'repeatPassword',
      handleErrors:[
        { name:'required',     message:'* The repeat password field is required' },
        { name:'equalInput1',      message:'* The passwords do not match' },
      ]
    });
  }


  // funcion para validar y mostrar los mesajes de error (tocado y no validado)
  public validField(fieldName:string){
    return this.loginForm.controls[fieldName]?.touched && this.loginForm.controls[fieldName]?.errors;
  }


  // funcion para el manejo de envio de los datos del formulario
  public saved(){
    console.log('send...');
    this.loginForm.markAllAsTouched();
  }


}
