import { Component } from '@angular/core';
import { Categoria } from 'src/app/entities/categoria';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {

  listaCategoria: Categoria[] | undefined;
  itemElegido: Categoria | undefined;

  constructor(private categoriaService:CategoriasService) { }

  ngOnInit(): void {
    this.categoriaService.categoriaSelect().subscribe(
      (res) => { 
        // console.log(res);
        this.listaCategoria = JSON.parse(JSON.stringify(res));
      }
    )
  }

  seleccionarCategoria(itemSeleccionado: Categoria) {
      // console.log(itemSeleccionado)
      this.itemElegido = itemSeleccionado;
  }
}
