import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechadatetime'
})
export class FechadatetimePipe implements PipeTransform {

  transform(value: any): any {
    let fecha = value
    if(value){
      fecha = value.substring(0,value.lastIndexOf(":"))
    }
    
    return fecha;
  }

}
