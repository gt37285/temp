import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';
import { evaluacionesService } from 'src/app/services/evaluaciones.service';
import { evaluacionModel } from 'src/app/models/cursos/evaluacion.model';
import { preguntaModel } from 'src/app/models/cursos/pregunta.model';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { respuestaModel } from 'src/app/models/cursos/respuesta.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss','../../gestion.component.scss']
})
export class FormularioComponent implements OnInit {

  private id_evaluacion:String = ""
  private evaluacion:evaluacionModel
  public loading:Boolean = false
  public preguntas:preguntaModel[] = []
  private aux:Boolean = false
  public total:number = 0
  public pregunta:preguntaModel
  public form:FormGroup
  public model:any 
  public puntaje:Number = 0
  public formvf:FormGroup
  public selected:String = ''
  public selectedUniq: String = ''
  public formuniq:FormGroup

  public puntajes:Number[] = [1,2,3,4,5]
  public selectPuntaje:String = ''

  constructor(
    private router:ActivatedRoute,
    private service:evaluacionesService,
    private render:Renderer2
  ) { 

    this.router.params
      .subscribe( (data:any) => {
          this.id_evaluacion = data.id
          this.listarEvaluacion(data.id)
      })

      this.form = new FormGroup({
        respuestas: new FormArray([
          new FormGroup({
            estado: new FormControl(''),
            nombre: new FormControl('',Validators.required)
          }),
          new FormGroup({
            estado: new FormControl(''),
            nombre: new FormControl('',Validators.required)
          }),
          new FormGroup({
            estado: new FormControl(''),
            nombre: new FormControl('',Validators.required)
          }),
          new FormGroup({
            estado: new FormControl(''),
            nombre: new FormControl('',Validators.required)
          }),
        ])
      })

      this.formvf =new FormGroup({
        respuestas: new FormArray([
          new FormGroup({
            estado: new FormControl(''),
            nombre: new FormControl('',Validators.required)
          }),
          new FormGroup({
            estado: new FormControl(''),
            nombre: new FormControl('',Validators.required)
          })
        ])
      })

      this.formuniq = new FormGroup({
        respuestas: new FormArray([
          new FormGroup({
            estado: new FormControl(''),
            nombre: new FormControl('',Validators.required)
          }),
          new FormGroup({
            estado: new FormControl(''),
            nombre: new FormControl('',Validators.required)
          }),
          new FormGroup({
            estado: new FormControl(''),
            nombre: new FormControl('',Validators.required)
          }),
          new FormGroup({
            estado: new FormControl(''),
            nombre: new FormControl('',Validators.required)
          }),
        ])
      })

      this.model = {
        editorData: '<p>Escribe la pregunta ...</p>',
        config: { 
          toolbarGroups : [
            { name: 'clipboard', groups: [ 'undo' ] },
            { name: 'editing', groups: [ 'spellchecker'] },
            { name: 'basicstyles', groups: [ 'basicstyles'] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
            { name: 'links', groups: [ 'links' ] },
            { name: 'colors', groups: [ 'colors' ] },
            { name: 'others', groups: [ 'others' ] }
          ]
        }
      };
  }

  ngOnInit() {
    this.listarPreguntas()
  }


  listarEvaluacion(id:String){
    this.loading = true
      this.service.listarPorId(id)
        .subscribe( 
          ((data:any) => {
            this.evaluacion = data.evaluacion
            this.loading = false
          }),
          (err => this.loading = false)
        )
  }

  addPregunta(modal:any){
    if(!this.aux){
      this.render.addClass(modal,'show-modal')
    }else{
      this.render.removeClass(modal,'show-modal')
    }
    this.aux = !this.aux
  }


  listarPreguntas(){
    this.service.listarPreguntas(this.id_evaluacion)
      .subscribe(
        ((data:any) => {

         let pregunta = data.preguntas[0]

         let aux = pregunta.tipo

          switch(pregunta.tipo){
            case "A":
              pregunta.tipo = "Opcion Doble"
            break
            case "B":
              pregunta.tipo = "Respuesta Multiple"
            break
            case "C":
              pregunta.tipo = "Respuesta Abierta"
            break
            case "D":
              pregunta.tipo = "Respuesta Unica"
            break
          }

          this.pregunta = pregunta
          this.preguntas = data.preguntas

          for (let i = 0; i < data.preguntas.length; i++) {
            data.preguntas[i].numero = (i + 1)

        
            this.service.actualizarPregunta({numero:Number((i+1))},this.id_evaluacion,data.preguntas[i]._id)
              .subscribe( data => data)
          }

          this.total = data.preguntas.length
          this.model.editorData = pregunta.pregunta

          if(aux == 'B'){
            this.repuestaTipoB(pregunta)
          }

          if(aux == 'A'){
            this.repuestaTipoA(pregunta)
          }

          if( aux == 'D' ){
            this.repuestaTipoD(pregunta) 
          }
          
          if( aux == 'C'){
            this.selectPuntaje = pregunta.puntaje
          }
          
        })
      )
  }

  eliminar(pregunta:preguntaModel){
    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas eliminar la pregunta`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        this.loading = true
        this.service.eliminarPregunta(this.id_evaluacion,pregunta._id)
          .subscribe(
            ((data: any) => {
              Swal.fire({
                title: 'Proceso completado',
                text: data.message,
                icon: 'success'
              })
              this.loading = false
              this.listarPreguntas()
            }),
            (err => this.loading = false)
          )
      }
    });
  }

  agregarPregunta(tipo:String,modal:any){

    let pregunta:any ={
      tipo,
      numero: this.total+1
    }

    this.selectedUniq = ''

    this.loading = true

    this.service.agregarPregunta(pregunta,this.id_evaluacion)
      .subscribe(
        ((data:any) =>{

          Swal.fire({
            title: 'Proceso Completado',
            text: data.message,
            icon: 'success'
          })
          this.loading = false
          this.listarPreguntas()
          this.aux = false
          this.render.removeClass(modal,'show-modal')
        }),
        (err=>this.loading = false)
      )

  }

  addResp(){
    (<FormArray> this.form.controls['respuestas']).push(new FormGroup({
      estado: new FormControl(''),
      nombre: new FormControl('',Validators.required)
    }))
  }

  addRespuniq(){
    (<FormArray> this.formuniq.controls['respuestas']).push(new FormGroup({
      estado: new FormControl(''),
      nombre: new FormControl('',Validators.required)
    }))
  }

  registrarPregunta(){

    let data = {
      pregunta: this.model.editorData
    }

    this.loading = true
    this.service.actualizarPregunta(data,this.id_evaluacion,this.pregunta._id)
          .subscribe(
            ((data:any) => {
              Swal.fire({
                title: 'Proceso completado',
                text: data.message,
                icon: 'success'
              })
              this.loading = false
            }),
            (err => this.loading = false)
          )

  }

  respuestasFormMultiple(){


    if( this.form.invalid ){
        return Swal.fire({
          title: 'Formulario invalido',
          text: 'Revisa todas las respuestas y no olvides registrar un puntaje',
          icon: 'warning'
        })
    }

    if( !this.selectPuntaje ){
        return Swal.fire({
          title: 'Formulario invalido',
          text: 'Selecciona un puntaje',
          icon: 'warning'
        })
    }


    let respuestas:any = this.form.value.respuestas
    let estado = null

    for (const respuesta of respuestas) {
      if(!respuesta.estado){
        respuesta.estado = false
      }
      if(respuesta.estado){
        estado = true
      }
    }

    if(!estado){
      return Swal.fire({
        title: 'Formulario invalido',
        text: 'Selecciona al menos una respuesta correcta',
        icon: 'warning'
      })
    }
    

    let aux = {
      "puntaje":this.selectPuntaje,
      "respuestas": respuestas
    }


    this.loading = true
    this.service.agregarRespuestas(aux,this.id_evaluacion,this.pregunta._id)
      .subscribe(
        ((data:any) => {
          Swal.fire({
            title: 'Proceso completado',
            text: data.message,
            icon: 'success'
          })

          this.selectPuntaje = null
          this.loading = false
        }),
        (err => this.loading = false)
      )
  }

  eliminarRespuestauniq(index:number){

    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas eliminar la respuesta`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        (<FormArray> this.formuniq.get('respuestas')).removeAt(index)
        this.respuestasFormUnica()
      }
    });
    
  }
  eliminarRespuesta(index:number){

    Swal.fire({
      title: "Estas Seguro?",
      text: `Confirma que deseas eliminar la respuesta`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar"
    }).then(data => {
      if (data.value) {
        (<FormArray> this.form.get('respuestas')).removeAt(index)
        this.respuestasFormMultiple()
      }
    });
    
  }

  changePregunta(pregunta:any){
    this.selectPuntaje = null
    this.form.reset()
    this.loading = true
    this.service.listarPreguntaId(this.id_evaluacion,pregunta._id)
      .subscribe(
        ((data:any) => {

          
          this.loading = false
          this.model.editorData = data.pregunta.pregunta

          let tipo = data.pregunta.tipo

          switch(data.pregunta.tipo){
              case "A":
                data.pregunta.tipo = "Opcion Doble"
              break
              case "B":
                data.pregunta.tipo = "Respuesta Multiple"
              break
              case "C":
                data.pregunta.tipo = "Respuesta Abierta"
              break
              case "D":
                data.pregunta.tipo = "Respuesta Unica"
              break
          }

            this.pregunta = data.pregunta


            if( tipo == 'B' ){
                this.repuestaTipoB(data.pregunta) 
            }

            if( tipo == 'A' ){
              this.repuestaTipoA(data.pregunta) 
            }

            if( tipo == 'D' ){
              this.repuestaTipoD(data.pregunta) 
            }


            if( tipo == 'C'){
              this.selectPuntaje = data.pregunta.puntaje
            }

        }),
        (err => this.loading = false)
      )


    this.pregunta = this.preguntas[pregunta.numero-1]
  }


  repuestaTipoB(pregunta:any){

    let respuestas = pregunta.respuestas

    if(respuestas.length <= 0){
      
      (<FormArray> this.form.controls['respuestas']).clear()
      for (let index = 0; index < 4; index++) {
        (<FormArray> this.form.controls['respuestas']).push(new FormGroup({
          estado: new FormControl(''),
          nombre: new FormControl('',Validators.required)
        }))
      }
      return
    }

    (<FormArray> this.form.controls['respuestas']).clear()

    for (const respuesta of pregunta.respuestas) {
      (<FormArray> this.form.controls['respuestas']).push(new FormGroup({
        estado: new FormControl(''),
        nombre: new FormControl('',Validators.required)
      }))
      delete respuesta._id
    }
      let formulario = {
        respuestas: pregunta.respuestas
      }
      
      this.selectPuntaje = pregunta.puntaje
      this.form.setValue(formulario)
  }

  repuestaTipoA(pregunta:any){

   let respuestas = pregunta.respuestas
    
    if(respuestas.length <= 0){
      
      (<FormArray> this.formvf.controls['respuestas']).clear()
      for (let index = 0; index < 2; index++) {
        (<FormArray> this.formvf.controls['respuestas']).push(new FormGroup({
          estado: new FormControl(''),
          nombre: new FormControl('',Validators.required)
        }))
      }
      return
    }

    (<FormArray> this.formvf.controls['respuestas']).clear()

    for (const respuesta of pregunta.respuestas) {
      (<FormArray> this.formvf.controls['respuestas']).push(new FormGroup({
        estado: new FormControl(''),
        nombre: new FormControl('',Validators.required)
      }))

      delete respuesta._id
    }

    if (pregunta.respuestas[0].estado ) {
      this.selected ='A'  
    }else{
      this.selected ='B'
    }
  
    let formulario = {
      respuestas: pregunta.respuestas
    }

     
    this.selectPuntaje = pregunta.puntaje
    this.formvf.setValue(formulario)
  }

  repuestaTipoD(pregunta:any){

    let respuestas = pregunta.respuestas

    if(respuestas.length <= 0){
      
      (<FormArray> this.formuniq.controls['respuestas']).clear()
      for (let index = 0; index < 4; index++) {
        (<FormArray> this.formuniq.controls['respuestas']).push(new FormGroup({
          estado: new FormControl(''),
          nombre: new FormControl('',Validators.required)
        }))
      }
      return
    }

    (<FormArray> this.formuniq.controls['respuestas']).clear()

    for (const respuesta of pregunta.respuestas) {
      (<FormArray> this.formuniq.controls['respuestas']).push(new FormGroup({
        estado: new FormControl(''),
        nombre: new FormControl('',Validators.required)
      }))
      delete respuesta._id
    }
      let formulario = {
        respuestas: pregunta.respuestas
      }

      for (let i = 0; i < pregunta.respuestas.length; i++) {
        if( pregunta.respuestas[i].estado){
          this.selectedUniq = (i+1).toString()
        }
      }

      this.selectPuntaje = pregunta.puntaje
      
      
      this.formuniq.setValue(formulario)
  }


 
  respuestasvf(){

    if(this.formvf.invalid){
      return Swal.fire({
        title: 'Formulario invalido',
        text: 'Por favor ingresa todas las repuestas posibles, No olvides registrar un puntaje',
        icon: 'warning'
      })
    }

    if(!this.selected){
      return Swal.fire({
        title: 'Formulario invalido',
        text: 'Selecciona una respuesta correcta',
        icon: 'warning'
      })
    }

    if( !this.selectPuntaje ){
      return Swal.fire({
        title: 'Formulario invalido',
        text: 'Selecciona un puntaje',
        icon: 'warning'
      })
  }

    let respuestas:any = this.formvf.value.respuestas

    for (const respuesta of respuestas) {
      respuesta.estado = false
    }


    if(this.selected == 'A'){
      respuestas[0].estado = true
    }

    if(this.selected == 'B'){
      respuestas[1].estado = true
    }
    

    let aux = {
      "puntaje":this.selectPuntaje,
      "respuestas": respuestas
    }

    this.loading = true
    this.service.agregarRespuestas(aux,this.id_evaluacion,this.pregunta._id)
      .subscribe(
        ((data:any) => {
          Swal.fire({
            title: 'Proceso completado',
            text: data.message,
            icon: 'success'
          })
          this.selectPuntaje = null
          this.loading = false
        }),
        (err => this.loading = false)
      )
  }


  respuestasFormUnica(){


    if( this.formuniq.invalid ){
        return Swal.fire({
          title: 'Formulario invalido',
          text: 'Revisa todas las respuestas',
          icon: 'warning'
        })
    }

    if(!this.selectedUniq ){
        return Swal.fire({
          title: 'Formulario invalido',
          text: 'Por favor selecciona una respuesta correcta',
          icon: 'warning'
        })
    }

    if(!this.selectPuntaje ){
      return Swal.fire({
        title: 'Formulario invalido',
        text: 'Por favor selecciona un puntaje',
        icon: 'warning'
      })
  }


    let respuestas:any = this.formuniq.value.respuestas

    let correcta = Number(this.selectedUniq)-1

    for (let i = 0; i < respuestas.length; i++) {

      respuestas[i].estado = false
      if(correcta == i){
        respuestas[i].estado = true
      }
    }
  
    let aux = {
      "puntaje":this.selectPuntaje,
      "respuestas": respuestas
    }


    this.loading = true
    this.service.agregarRespuestas(aux,this.id_evaluacion,this.pregunta._id)
      .subscribe(
        ((data:any) => {
          Swal.fire({
            title: 'Proceso completado',
            text: data.message,
            icon: 'success'
          })
          this.selectPuntaje = null
          this.loading = false
        }),
        (err => this.loading = false)
      )
  }
  
 
}
