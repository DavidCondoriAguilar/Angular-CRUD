import { Component, Input } from '@angular/core';
import { Categoria } from 'src/app/entities/categoria';
import { ItemCarrito } from 'src/app/entities/itemCarrito';
import { Producto } from 'src/app/entities/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  @Input() categoriaX: Categoria | undefined;

  listaProducto: Producto[] | undefined;

  constructor(private productoService: ProductosService) { }

  ngOnChanges(): void {
    this.productoService.productosSelect(this.categoriaX?.idcategoria).subscribe(
      (res) => {
        // console.log(res);
        this.listaProducto = JSON.parse(JSON.stringify(res));
      }
    )
  }

  agregarCarrito(item: Producto) {

    // console.log(item)


    let iCarrito: ItemCarrito = {
      idproducto: item.idproducto,
      nombre: item.nombre,
      precio: Number(item.precio),
      cantidad: 1
    }

    if (localStorage.getItem("carrito") === null) {
       // Si no hay un carrito en el almacenamiento local, se crea uno nuevo y se agrega el primer elemento
      let carrito: ItemCarrito[] = [];
      carrito.push(iCarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    else {
      // Si ya existe un carrito en el almacenamiento local, se obtiene y se actualiza
      let carritoStorage = localStorage.getItem("carrito") as string;
      let carrito = JSON.parse(carritoStorage);

      let index = -1;

      // Se busca el elemento iCarrito en el carrito actual
      for (let i = 0; i < carrito.length; i++) {
        let itemC:ItemCarrito = carrito[i];
        if(iCarrito.idproducto === itemC.idproducto) {
          index =i;
          break;
        }
      }

      if(index === -1) {
         // Si el elemento iCarrito no existe en el carrito actual, se agrega al carrito
        carrito.push(iCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
      else{
        // Si el elemento iCarrito ya existe en el carrito actual, se actualiza la cantidad
        let itemCarrito: ItemCarrito = carrito[index];
        itemCarrito.cantidad!++

        carrito[index] = itemCarrito;
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
    } 
  }
}
