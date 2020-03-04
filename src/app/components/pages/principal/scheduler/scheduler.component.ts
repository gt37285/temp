import { Component, OnInit, Renderer2 } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { FormControl, FormGroup } from "@angular/forms";
import { TareasService } from '../../../../services/tareas.service';
import Swal from 'sweetalert2';
import { ArchivoService } from '../../../../services/archivo.service';
import { UsuariosService } from '../../../../services/usuarios.service';


@Component({
  selector: "app-scheduler",
  templateUrl: "./scheduler.component.html",
  styleUrls: ["./scheduler.component.scss"]
})
export class SchedulerComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, interactionPlugin, listPlugin]; // important!
  calendarEvents: any;
  header: {};
  views: {};
  buttonText: {};
  customButtons: {};
  weekNumbers: boolean;
  selectAllow: {};
  forma: FormGroup;
  evento: any
  archivo: File
  id_tarea: string
  loading: boolean = false
  adjuntos: any = []

  constructor(
    private render: Renderer2,
    private _service: TareasService,
    private _archivoService: ArchivoService,
    private _userService: UsuariosService

  ) {
    this.forma = new FormGroup({
      file: new FormControl("")
    });

    this.header = {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek"
    };

    this.buttonText = {
      today: "Hoy",
      month: "Mes",
      week: "Semana",
      day: "Dia",
      list: "Lista"
    };

    this.views = {
      dayGridMonth: {
        titleFormat: { year: "numeric", month: "long" },
        titleRangeSeparator: "/",
        eventLimit: 3
      },
      week: {
        titleFormat: { year: "numeric", month: "long", day: "numeric" },
        titleRangeSeparator: "/",
        eventLimit: 30
      },
      day: {
        titleFormat: { year: "numeric", month: "long", day: "numeric" },
        titleRangeSeparator: "/",
        eventLimit: 30
      }
    };

    this.customButtons = {
      leyenda: {
        text: "Leyenda",
        click: e => {
          // this.render.addClass(e.target, 'showLeyenda')
        }
      }
    };

    this.weekNumbers = true;

    this.selectAllow = selectInfo => {
      // console.log(selectInfo) /**esta funcion contiene la toda la informacion relacionada al dia se dispara al dar click en algun dia*/
    };
  }

  ngOnInit(): void {

    this.cargarTareas();
    this.mostrarSemanas();

  }

  mostrarSemanas() {
    window.addEventListener("resize", e => {
      if (window.innerWidth <= 900) {
        this.weekNumbers = false;
      } else {
        this.weekNumbers = true;
      }
    });
  }

  cargarTareas() {


    this.loading = true
    this._service.cargarTareaPorUsuario(this._userService.user._id)
      .subscribe((data: any) => {


        this.calendarEvents = data

        for (let i = 0; i < data.length; i++) {

          this.calendarEvents[i].id = data[i]._id

          const adjunto = data[i].extendedProps.adjunto

          this.adjuntos = adjunto

          for (const key in adjunto) {

            if (adjunto[key]) {
              this.calendarEvents[i].textColor = '#06581f'
            } else {
              this.calendarEvents[i].textColor = '#c21a1afb'
            }
          }

          this.calendarEvents[i].backgroundColor = '#d4d1d188'
          this.calendarEvents[i].borderColor = '#d4d1d188'
        }

        this.loading = false
      })
  }

  eventClick(event: any, modal: any) {

    if (event.event.end < new Date()) {
      return Swal.fire({
        title: 'Advertencia!',
        text: `La fecha limite expiro`,
        icon: 'warning'
      })
    }


    this.evento = event.event

    this.render.addClass(modal, "show-modal");

  }

  hidden_modal(modal: any) {
    this.render.removeClass(modal, "show-modal");
  }

  filed(file: File) {

    if (!file) {
      return
    }

    if (file.name.length > 50) {
      return Swal.fire({
        title: 'Advertencia!',
        text: `el nombre del archivo es muy largo`,
        icon: 'warning'
      })
    }

    this.archivo = file
  }

  cargarArchivo(evento: any, modal: any) {

    if (this.forma.invalid) {
      return Swal.fire({
        title: 'Error!',
        text: `no se ha seleccinado ningun archivo`,
        icon: 'error'
      })
    }

    this.loading = true

    this._archivoService.subirArchivo(this.archivo, 'tareas', evento.id, this._userService.user._id)
      .then((data: any) => {
        this.loading = false
        Swal.fire({
          title: 'Completado',
          text: data.message,
          icon: 'success'
        })
        this.cargarTareas()
      })
      .catch(err => {
        this.loading = false
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error'
        })
      })

    this.render.removeClass(modal, "show-modal");

  }

}
