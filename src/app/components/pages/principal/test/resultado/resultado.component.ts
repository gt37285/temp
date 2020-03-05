import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { evaluacionesService } from 'src/app/services/evaluaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss', '../test.component.scss']
})
export class ResultadoComponent implements OnInit {

  private id: String = ''
  public loading: Boolean = false
  public evaluaciones: any = []
  public resultados: any

  constructor(
    private router: Router,
    private active_router: ActivatedRoute,
    private service: evaluacionesService,
    public userService: UsuariosService
  ) {
    this.active_router.params.subscribe((data: any) => this.id = data.id)
  }

  ngOnInit() {
    this.cargarEvaluacion()
    this.cargarResultados()
  }

  cargarEvaluacion() {
    this.loading = true
    this.service.listarPorId(this.id)
      .subscribe(
        ((data: any) => {
          this.evaluaciones = data.evaluacion
          this.loading = false
        }),
        (err => this.loading = false)
      )
  }

  cargarResultados() {
    this.loading = true
    this.service.resultados(this.id)
      .subscribe(
        ((data: any) => {
          this.resultados = data.estudiante
          this.loading = false
        }),
        (err => this.loading = false)
      )
  }

  generarPDF() {
    
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('test.pdf');
    });
  }
}
