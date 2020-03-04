import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pipe_password"
})
export class passwordPipe implements PipeTransform {
  transform(value: string, hidde: boolean) {
    let type: string = value;
    if (hidde) type = "password";
    return type;
  }
}
