import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCarrito } from 'src/app/entities/itemCarrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  listaItemCarrito: ItemCarrito[] = [];
  subtotal: number = 0;
  envio: number = 0;
  total: number = 0;
  showSuccess: boolean = false;

  constructor(private router: Router) {}

  getImageUrl(imagenPath: string | undefined): string {
    if (!imagenPath) {
      return this.getPlaceholderImage();
    }
    // Remove leading slash if it exists and any whitespace
    const cleanPath = imagenPath.trim().replace(/^\/+/, '');
    // Check if it's already a full URL
    if (cleanPath.startsWith('http')) {
      return cleanPath;
    }
    // Check if it's a relative path (starts with assets/)
    if (cleanPath.startsWith('assets/')) {
      return `/${cleanPath}`;
    }
    // Otherwise, assume it's a path from the API
    return `https://servicios.campus.pe/${cleanPath}`;
  }

  private getPlaceholderImage(): string {
    // SVG placeholder with a simple shopping cart icon
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23dee2e6'%3E%3Cpath d='M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z'/%3E%3C/svg%3E";
  }

  /**
   * Maneja el error al cargar una imagen del producto
   * @param event Evento de error
   * @param item Item del carrito
   */
  handleImageError(event: Event, item: ItemCarrito): void {
    const imgElement = event.target as HTMLImageElement;
    // Set a placeholder image with the product name
    imgElement.onerror = null; // Prevent error loops
    imgElement.src = this.getPlaceholderImage();
    imgElement.style.objectFit = 'contain';
    if (imgElement.parentElement) {
      const parent = imgElement.parentElement as HTMLElement;
      parent.style.backgroundColor = '#f8f9fa';
      parent.style.padding = '0.5rem';
    }
  }

  ngOnInit(): void {
    this.cargarCarrito();
  }

  getTotalItems(): number {
    return this.listaItemCarrito.reduce((total, item) => total + (item.cantidad || 0), 0);
  }

  private cargarCarrito() {
    const carritoStorage = localStorage.getItem("carrito");
    this.listaItemCarrito = carritoStorage ? JSON.parse(carritoStorage) : [];
    this.calcularTotales();
  }

  private calcularTotales() {
    this.subtotal = this.listaItemCarrito.reduce((sum, item) => 
      sum + (item.precio || 0) * (item.cantidad || 0), 0);
    
    this.envio = this.subtotal > 0 ? (this.subtotal > 100 ? 0 : 15) : 0;
    this.total = this.subtotal + this.envio;
  }

  actualizarCantidad(item: ItemCarrito, cambio: number) {
    item.cantidad = (item.cantidad || 0) + cambio;
    
    if (item.cantidad < 1) {
      this.eliminarItem(item);
    } else {
      this.guardarCarrito();
    }
  }

  eliminarItem(item: ItemCarrito) {
    this.listaItemCarrito = this.listaItemCarrito.filter(
      i => i.idproducto !== item.idproducto
    );
    this.guardarCarrito();
  }

  vaciarCarrito() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      this.listaItemCarrito = [];
      this.guardarCarrito(true);
    }
  }

  private guardarCarrito(vaciar: boolean = false) {
    if (vaciar) {
      localStorage.removeItem('carrito');
    } else {
      localStorage.setItem('carrito', JSON.stringify(this.listaItemCarrito));
    }
    this.calcularTotales();
  }

  procederPago() {
    if (this.listaItemCarrito.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    
    // Simular pago exitoso
    this.showSuccess = true;
    setTimeout(() => {
      this.vaciarCarrito();
      this.router.navigate(['/']);
    }, 2000);
  }
}
