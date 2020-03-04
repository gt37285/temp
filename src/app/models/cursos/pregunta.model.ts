export class preguntaModel{
    [x: string]: any;
    constructor(
        public _id:String,
        public pregunta: String,
        public tipo: String,
        public puntaje: Number,
        public numero: Number
    ){}
}