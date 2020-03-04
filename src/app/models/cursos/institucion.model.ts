export default class InstitucionModel{
    constructor(
        public _id: String,
        public nombre: String,
        public dir_calle_principal: String,
        public dir_calle_secundaria: String,
        public dir_num: String,
        public admin?:Boolean
    ){}
}