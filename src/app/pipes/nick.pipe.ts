import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "nick"
})
export class NickPipe implements PipeTransform {
  transform(nombre: string, apellido: string) {

    if (!nombre || !apellido) {
      return
    }


    
    let upperNombre = nombre.substring(0, 1).toUpperCase();
    let lowerNombre = nombre.substring(1, nombre.length).toLowerCase();
    nombre = upperNombre.concat(lowerNombre);
    
    nombre.concat(" ");
    
    if (nombre.indexOf(" ") != -1) {
      nombre = nombre.substring(0, nombre.indexOf(" "));
    }
    
    
    let upperApellido = apellido.substring(0, 1).toUpperCase();
    let lowerApellido = apellido.substring(1, apellido.length).toLowerCase();
    apellido = upperApellido.concat(lowerApellido);
    apellido.concat(" ");

    if (apellido.indexOf(" ") != -1) { 
      apellido = apellido.substring(0, apellido.indexOf(" "));
    }

    let nick = `${nombre} ${apellido}`;
    
    return nick;
  }
}
