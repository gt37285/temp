export class UsuarioModel {
  constructor(
    public nombre: string,
    public nick: string,
    public apellido: string,
    public email: string,
    public password: string,
    public cedula: string,
    public passwordAnt?:string,
    public ciudad?: string,
    public genero?: string,
    public telefono?: string,
    public institucion?: string,
    public rol?: string,
    public estado?: boolean,
    public img?: string,
    public fechaNac?: Date,
    public lugarNac?: string,
    public callePrincipal?: string,
    public calleSecundaria?: string,
    public numCasa?: string,
    public _id?: string
  ) {}
}
