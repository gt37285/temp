import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "capitalizar"
})
export class CapitalizarPipe implements PipeTransform {
  transform(texto: string): any {
    if (!texto) {
      return
    }

    let words = texto.split(' ')
    let upper = ''
    let lower = ''
    let complete = ''

    for (const word of words) {
      upper = word.substring(0, 1).toUpperCase();
      lower = word.substring(1, word.length).toLowerCase();
      complete += `${upper}${lower} `
    }

    return complete
  }
}
