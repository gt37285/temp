import { Component, OnInit } from '@angular/core';
import { ObjetivoModel } from 'src/app/models/cursos/objetivos.model';
import { cursoModel } from 'src/app/models/cursos/cursos.model';
import { CursosService } from 'src/app/services/cursos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ObjetivosService } from 'src/app/services/objetivos.service';
import { requerimentosService } from 'src/app/services/requerimentos.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { requerimentoModel } from 'src/app/models/cursos/requerimentos.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-objetivos-requerimentos',
  templateUrl: './objetivos-requerimentos.component.html',
  styleUrls: ['../cursos-prof.component.scss','../../gestion.component.scss']
})
export class ObjetivosRequerimentosComponent implements OnInit{

  public loading:Boolean = false
  public curso_id:string = ''

  /**definiciones para los objetivos */

  public objetivos: ObjetivoModel[] = []
  public totalObjetivos: number = 0
  public cursos:cursoModel[] = []
  

  /**definiciones para los requerimentos */

  public requisitos: ObjetivoModel[] = []
  public totalRequisitos: number = 0

  constructor(
    private _service: CursosService,
    private _userService: UsuariosService,
    private _objetivoService: ObjetivosService,
    private _requisitoService: requerimentosService,
    private activatedRouter:ActivatedRoute
  ) { 

    this.activatedRouter.params.subscribe((data:any) => this.curso_id = data.id)
  }

  ngOnInit(){
    this.listarObjetivos()
    this.listarRequisitos()
  }


    /**seccion para los objetivos */
  
    listarObjetivos() {

      this.loading = true
  
      this._objetivoService.listarObjetivos(this.curso_id)
        .subscribe(
          (data => {
            this.totalObjetivos = data.length
            this.objetivos = data
            this.loading = false
          }),
          (err =>  this.loading = false
        )
      )
    }
  
    actualizarObj(objetivo: ObjetivoModel) {
  
      Swal.fire({
        title: "Estas Seguro?",
        text: `Confirma que deseas actulizar el objetivo`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar"
      }).then(data => {
        if (data.value) {
          this.loading = true
          this._objetivoService.actualizarObjetivo(objetivo,this.curso_id)
            .subscribe(data => {
              this.loading = false
              Swal.fire({
                title: "Completado!",
                text: "Se actualizo el objetivo correctamente!",
                icon: "success",
                confirmButtonText: "Cool"
              });
            }, (err) => this.loading = false
            )
        }
      });
    }
  
    eliminarObj(objetivo: ObjetivoModel) {
  
      Swal.fire({
        title: "Estas Seguro?",
        text: `Confirma que deseas eliminar el objetivo`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar"
      }).then(data => {
        if (data.value) {
          this.loading = true
          this._objetivoService.eliminarObjetivos(this.curso_id,objetivo._id)
            .subscribe(data => {
              this.loading = false
              Swal.fire({
                title: "Completado!",
                text: "Se elimino el objetivo correctamente!",
                icon: "success",
                confirmButtonText: "Cool"
              });
              this.listarObjetivos()
            },
              (err) => this.loading = false
            )
        }
      });
    }
  
    registrarObj(form: NgForm) {
      if (form.invalid) {
        return Swal.fire({
          title: 'Alerta!',
          text: 'formulario Invalido',
          icon: 'warning'
        })
      }

      let objetivo: ObjetivoModel = form.value
      this.loading = true
      
      this._objetivoService.agregarObjetivo(objetivo, this.curso_id)
        .subscribe(data => {
          this.loading = false
          Swal.fire({
            title: "Completado!",
            text: "Se agrego el objetivo correctamente!",
            icon: "success",
            confirmButtonText: "Cool"
          });

          this.listarObjetivos()
          form.reset()
        },
          (err) => this.loading = false
        )
    }
  
    /**seccion para los requisitos */
    
    listarRequisitos() {

      this.loading = true
  
      this._requisitoService.listar(this.curso_id)
        .subscribe(
          (data => {
            this.totalRequisitos = data.length
            this.requisitos = data
            this.loading = false
          }),
          (err =>  this.loading = false
        )
      )
    }
  
    actualizarReq(requerimento: requerimentoModel) {
  
      Swal.fire({
        title: "Estas Seguro?",
        text: `Confirma que deseas actulizar el requerimento`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar"
      }).then(data => {
        if (data.value) {
          this.loading = true
          this._requisitoService.actualizar(requerimento,this.curso_id)
            .subscribe(data => {
              console.log(data);
              this.loading = false
              Swal.fire({
                title: "Completado!",
                text: "Se actualizo el requerimento correctamente!",
                icon: "success",
                confirmButtonText: "Cool"
              });
            }, (err) => this.loading = false
            )
        }
      });
    }
  
    eliminarReq(requerimento: ObjetivoModel) {
      
      Swal.fire({
        title: "Estas Seguro?",
        text: `Confirma que deseas eliminar el requerimento`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar"
      }).then(data => {
        if (data.value) {
          this.loading = true
          this._requisitoService.eliminar(this.curso_id,requerimento._id)
            .subscribe(data => {
              this.loading = false
              Swal.fire({
                title: "Completado!",
                text: "Se elimino el requerimento correctamente!",
                icon: "success",
                confirmButtonText: "Cool"
              });
              this.listarRequisitos()
            },
              (err) => this.loading = false
            )
        }
      });
    }
  
    registrarReq(form: NgForm) {
      if (form.invalid) {
        return Swal.fire({
          title: 'Alerta!',
          text: 'formulario Invalido',
          icon: 'warning'
        })
      }
  
     
  
      let requisito: requerimentoModel = form.value
      this.loading = true
      
      this._requisitoService.agregar(requisito, this.curso_id)
        .subscribe(data => {
          this.loading = false
          Swal.fire({
            title: "Completado!",
            text: "Se agrego el requerimento correctamente!",
            icon: "success",
            confirmButtonText: "Cool"
          });

          this.listarRequisitos()
          form.reset()
        },
          (err) => this.loading = false
        )
    }
  


  

}
