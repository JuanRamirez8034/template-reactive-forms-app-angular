import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.css']
})
export class BasicsComponent {

  // extrayendo los valores del formulario pasado como refLocal y almacenando en una variable
  // se le coloca "!:" para especificar que la variable contendrá algo y no será nula
  @ViewChild('basicTemplateForm') public form !: NgForm;

  // funcion para validar campo de nombre de producto, retorna booleano
  public validName():boolean{
    // se coloca "?." al form y al invail porque puede que no esten disponibles al iniciar la aplicación
    return this.form?.controls['name']?.invalid && this.form?.controls['name']?.touched;
  }

  // funcion para validar precio
  public validPrice():boolean{
    return this.form?.controls['price']?.invalid && //valido para las condiciones del html
           this.form?.controls['price']?.touched && //valido si ya fue tocado
           (this.form?.controls['price']?.value <= 0);//valido para el valor aceptado (mayor o igual a "0")
  }

  // funcion para validad stock (Sí es la misma que la anterior, como es ejemplo no quise hacerla más optima :D)
  public validStock():boolean{
    return this.form?.controls['stock']?.invalid && //valido para las condiciones del html
           this.form?.controls['stock']?.touched && //valido si ya fue tocado
           (this.form?.controls['stock']?.value <= 0);//valido para el valor aceptado (mayor o igual a "0")
  }

  public save():void{
    console.log(this.form.valid, this.form.value, this.form.controls['price']);  
      
  }

}
