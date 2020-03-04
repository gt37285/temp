export class cursoModel {
  constructor(
    public _id: string,
    public nombre: string,
    public descripcion: string,
    public puntuacion: number,
    public fecha: Date,
    public img: string,
    public usuario: any,
    public modulos: any,
    public dificultad: string,
    public estudiantes: [],
    public __v?: string
  ) { }
}
