import { Component } from '@angular/core';
import { ItemCarrito } from 'src/app/entities/itemCarrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  
  listaItemCarrito: ItemCarrito[] | undefined;

  ngOnInit(): void {
    
    let carritoStorage = localStorage.getItem("carrito") as string;

    let carrito = JSON.parse(carritoStorage);

    this.listaItemCarrito = carrito;
  }

  vaciarCarrito() {
    localStorage.clear();
    this.listaItemCarrito = [];
  }
}
