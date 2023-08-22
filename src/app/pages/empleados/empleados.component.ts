import { Component } from '@angular/core';
import { Empleado } from 'src/app/entities/empleado';
import { empleadoService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {

  listaEmpleados: Empleado[] | undefined;
  constructor(private empleadoService: empleadoService) { }

  ngOnInit(): void {
    this.empleadoService.empleadoSelect().subscribe(
      (res) => {
        // console.log(res);
        this.listaEmpleados = JSON.parse(JSON.stringify(res));
      }
    )
  }
}
