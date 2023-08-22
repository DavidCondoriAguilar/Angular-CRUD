import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) {}

  productosSelect(idcategoria: any) {
    const ruta = "https://servicios.campus.pe/productos.php?idcategoria=" + idcategoria;
    return this.http.get(ruta);
  }
}
