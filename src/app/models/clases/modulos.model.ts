export class ModulesModel {
  constructor(
    public _id: string,
    public nombre: string,
    public descripcion: string,
    public curso: any,
    public clases?: [],
    public recursos?: [],
    public fecha?: Date
  ) { }
}
