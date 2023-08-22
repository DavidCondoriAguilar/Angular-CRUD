import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class directoresService {

  constructor(private http: HttpClient) { }

  directoresSelect() {
    const ruta = "https://servicios.campus.pe/directores.php";
    return this.http.get(ruta);
  }

  
  directoresInsert(nombres: string, peliculas: string) {
    const ruta = "https://servicios.campus.pe/directoresinsert.php";
    const formData: FormData = new FormData();
    formData.append("nombres", nombres)
    formData.append("peliculas", peliculas)

    return this.http.post(ruta, formData).pipe(map(res => {
      return res;
    }));
  }

  directoresUpdate(nombres: string, peliculas: string, iddirector:string) {
    const ruta = "https://servicios.campus.pe/directoresupdate.php";
    const formData: FormData = new FormData();
    formData.append("nombres", nombres)
    formData.append("peliculas", peliculas)
    formData.append("iddirector", iddirector)

    return this.http.post(ruta, formData)
  }

  directoresDelete(iddirector: string) {
    const ruta = "https://servicios.campus.pe/directoresdelete.php";
    const formData: FormData = new FormData();
    formData.append("iddirector", iddirector)

    return this.http.post(ruta, formData)
  }
}

