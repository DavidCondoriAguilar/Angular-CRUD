import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/entities/proveedor';
import { proveedoresService } from 'src/app/services/proveedores.service';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
})
export class ProveedoresComponent implements OnInit {
  
  listaProveedores: Proveedor[] = [];

  proveedoresFilter: any = { nombreempresa: '' };
  p = 1;

  constructor(private proveedoresService: proveedoresService) { }

  ngOnInit(): void {
    this.proveedoresService.proveedoresSelect().subscribe(
      (res) => {
        if (Array.isArray(res)) {
          this.listaProveedores = res;
        } else {
          // Manejar el caso en el que la respuesta no es un arreglo válido
        }
      }
    );
  }

  // filterByNombre(text: string) {
  //   return this.listaProveedores.filter((proveedor: Proveedor) => {
  //     return proveedor.nombreempresa.toLowerCase().includes(text.toLowerCase());
  //   });
  // }
}
