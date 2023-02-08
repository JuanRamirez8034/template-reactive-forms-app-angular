import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlerConfig } from 'src/app/components/interfaces/interfaces';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.css']
})
export class BasicsComponent {

  // variables para el alert (estas propiedades provienen del archivo de interfaces personalizadas)
  public alertConfig : AlerConfig = {
    showSpinner : true,
    showAlert : false,
    text:''
  }

  // funcion para descartar el alerta
  private hideAlert():void{
    setTimeout(()=>this.alertConfig = {text:'', showAlert:false, showSpinner:false}, 1500);
  }


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
    // Mostrando el alerta personalizado
    this.alertConfig = {showAlert:true, text:'Loading...', showSpinner: true};


    // funcionalidad para realizar el restablecimiento del formulario
    setTimeout(()=>{
      // funcionalidad para restablecer el formulario
      // this.form.reset({
      //   name:'',
      //   price:0,
      //   stock:0
      // });//restablecer el formulario

      this.form.resetForm({
        name:'',
        price:0,
        stock:null
      });

      // funcionalidad para el alert
      this.alertConfig = {showAlert:true, showSpinner:false, text:'Finish loading...'}
      this.hideAlert();
    }, 3000);
      
  }

}
