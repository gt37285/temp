export class evaluacionModel{
    constructor(
        public _id:String,
        public nombre: String,
        public descripcion: String,
        public tiempo:String,
        public fecha_i:Date,
        public fecha_f:Date,
        public puntaje:String,
        public curso:String,
        public estudiantes: any,
        public user:String,
        public intentos:Number,
        public  preguntas: any
    ){}
}