import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Categoria } from 'src/app/entities/categoria';
import { ItemCarrito } from 'src/app/entities/itemCarrito';
import { Producto } from 'src/app/entities/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  @Input() categoriaX: Categoria | undefined;

  listaProducto: Producto[] | undefined;

  cartCount: number = 0;
  showNotification: boolean = false;
  notificationMessage: string = '';

  private destroyed = false;

  constructor(
    private productoService: ProductosService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement) {
      imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNkZWUyZTYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbWFnZSI+CiAgPHByb3BlcnR5IG5hbWU9InN0cm9rZSIgY29udGVudD0iI2RlZTJlNiIvPgogIDxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiIHJ5PSIyIi8+CiAgPGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjIiLz4KICA8cGF0aCBkPSJNMjEgMTVhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWOGEyIDIgMCAwIDEgMi0yaDVsMi0yaDlsMiAyaDFhMiAyIDAgMCAxIDIgMnoiLz4KPC9zdmc+';
    }
  }

  ngOnInit() {
    this.updateCartCount();
  }

  private updateCartCount() {
    const cart = localStorage.getItem('carrito');
    if (cart) {
      this.cartCount = JSON.parse(cart).length;
    } else {
      this.cartCount = 0;
    }
  }

  private showNotificationMessage(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    
    // Remove any existing timeouts to prevent hiding a new notification prematurely
    if ((this as any).notificationTimeout) {
      clearTimeout((this as any).notificationTimeout);
    }
    
    // Start the hide animation after 3 seconds
    (this as any).notificationTimeout = setTimeout(() => {
      const notification = document.querySelector('.notification');
      if (notification) {
        notification.classList.add('hide');
        
        // Remove the notification from DOM after animation completes
        setTimeout(() => {
          this.showNotification = false;
          // Force change detection
          if (!(this as any).destroyed) {
            (this as any).cdRef.detectChanges();
          }
        }, 300); // Match this with the slideOut animation duration
      }
    }, 3000);
  }

  ngOnChanges(): void {
    this.productoService.productosSelect(this.categoriaX?.idcategoria).subscribe(
      (res) => {
        // console.log(res);
        this.listaProducto = JSON.parse(JSON.stringify(res));
      }
    )
  }

  agregarCarrito(item: Producto) {
    const iCarrito: ItemCarrito = {
      idproducto: item.idproducto,
      nombre: item.nombre,
      precio: Number(item.precio),
      cantidad: 1,
      imagenchica: item.imagenchica,
      preciorebajado: item.preciorebajado ? Number(item.preciorebajado) : undefined
    };

    let carrito: ItemCarrito[] = [];
    let isNewItem = true;

    // Obtener carrito existente o inicializar uno nuevo
    const carritoStorage = localStorage.getItem("carrito");
    if (carritoStorage) {
      carrito = JSON.parse(carritoStorage);
      
      // Buscar si el producto ya está en el carrito
      const existingItemIndex = carrito.findIndex(
        (i: ItemCarrito) => i.idproducto === iCarrito.idproducto
      );

      if (existingItemIndex !== -1) {
        // Si el producto ya existe, incrementar la cantidad
        carrito[existingItemIndex].cantidad!++;
        isNewItem = false;
      } else {
        // Si es un producto nuevo, agregarlo al carrito
        carrito.push(iCarrito);
      }
    } else {
      // Si no hay carrito, crear uno nuevo con el producto
      carrito.push(iCarrito);
    }

    // Guardar el carrito actualizado
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Actualizar el contador del carrito
    this.updateCartCount();
    
    // Mostrar notificación
    this.showNotificationMessage(
      isNewItem 
        ? `¡${item.nombre} agregado al carrito!` 
        : `¡Se ha actualizado la cantidad de ${item.nombre} en el carrito!`
    );
  }
}
