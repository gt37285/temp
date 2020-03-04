export class recursoModel {

    constructor(
        public _id: string,
        public nombre: string,
        public tema: string,
        public tamano: string,
        public extension: string,
        public fecha: Date,
        public usuario: string
    ) { }
}