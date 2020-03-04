import { Component, OnInit, Renderer2 } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuarios/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss','../colecciones.component.scss']
})
export class PasswordComponent implements OnInit {
    public usuarios: UsuarioModel[];
    private desde: number;
    public total: number;
    public loading: boolean;
    public passwordS:String = ''
    
  
    constructor(
      public _service: UsuariosService
    ) {
      this.desde = 0;
      this.total = 0;
      this.loading = true;

    }
  
    ngOnInit() {
      this.cargarUsuarios();
    }
  
    cambiardesde(valor: number) {
      let desde = this.desde + valor;
  
      if (desde < 0 || desde > this.total) return;
  
      this.desde += valor;
  
      this.cargarUsuarios();
    }
  
  
    cargarUsuarios() {
      this.loading = true;
      this._service.cargarUsuarios(this.desde).subscribe((data: any) => {
        this.total = data.total;
        this.usuarios = data.user;
        this.loading = false;
      });
    }
  
    buscarUsuario(termino: string) {
      if (termino == "" || termino == null) {
        return this.cargarUsuarios();
      } else {
        this._service
          .buscarUsuarios(termino)
          .subscribe((data: any) => (this.usuarios = data));
      }
    }


    actualizarpass(usuario:UsuarioModel){
        if(!usuario.password){
          return Swal.fire({
            title: 'No se puede actualizar',
            text: 'Por favor, proporcione una contraseña',
            icon: 'info'
          })
        }

        

        
        Swal.fire({
          title: "Estas Seguro?",
          text: `Confirma que deseas actualizar la contraseña`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Continuar"
        }).then(data => {
          if (data.value) {

            let data:any = {
              _id: usuario._id,
              admin:true,
              password: usuario.password
            }

            this.loading = true
        
            this._service.actualizarPassword(data)
              .subscribe((data: any) => {
                  this.loading = false;
                  Swal.fire({
                    title: data.message,
                    text: `La contraseña ha sido actualizada`,
                    icon: 'success'
                  })
                this.loading = false
              },
              (err) => {
                this.loading = false;
              }
            );
          }
        });

    }
  }
