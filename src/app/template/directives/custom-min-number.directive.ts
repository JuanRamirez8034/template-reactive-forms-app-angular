import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";


@Directive({
  //especifica el seleccionador en el input. Deben aparecer ambos para que se aplique la funcionalidad
  selector:'[custonNumberMin][ngModel]',
  // agregar el tipo de proveedor
  providers:[{
    provide:NG_VALIDATORS,//proveedor de validaciones importado desde angular forms, especifica la nueva inyeccion
    useExisting:CustomMinNumberDirective,//especificar la clase que contiene la funcinalidad
    multi:true//especifica que las nuevas directivas seran añadidas a las ya existentes
  }]
})
export class CustomMinNumberDirective implements Validator {
  // recibiendo el valor de comprobación del input a traves de un "@Input"
  @Input('customMinNumber') public customMinNumber !: number;

  // funcion encargada de realizar las validaciones y retornar el resultado
  // recibe el campo "input" con el que se está trabajando (FormControl)
  // retornan un objeto con el error en "true" o null para el caso de validacion exitosa
  validate(control:FormControl){
    const inputValue = control.value;
    let valueRef :number;

    // verificando el tipo de dato y conviertiendolo a number
    if(typeof(this.customMinNumber) !== "number"){
      try{
        valueRef = parseInt(this.customMinNumber);
      }catch(e){
        return {customMinNumber:true};
      }
    }else{
      valueRef = this.customMinNumber;
    }

    // si el valor es mayor o igual al numero pasado como propiedad se retorna "null", caso contrario el error
    return valueRef <= inputValue ?  null : {customMinNumber:true};
  }

}