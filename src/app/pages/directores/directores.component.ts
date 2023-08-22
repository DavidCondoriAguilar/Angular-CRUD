import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Director } from 'src/app/entities/director';
import { directoresService } from 'src/app/services/directores.service';


@Component({
  selector: 'app-directores',
  templateUrl: './directores.component.html',
  styleUrls: ['./directores.component.css']
})

export class DirectoresComponent {

  listaDirectores: Director[] = [];

  directorActualizar: Director = {} as Director;
  
  directorEliminar: Director = {} as Director;

  p = 1;

  formGroup!: FormGroup;

  directoresInsertForm = new FormGroup({
    nombres: new FormControl('', [Validators.required]),
    peliculas: new FormControl('', [Validators.required])

  });
  
  directoresUpdateForm = new FormGroup({
    iddirector: new FormControl('', [Validators.required]),
    nombres: new FormControl('', [Validators.required]),
    peliculas: new FormControl('', [Validators.required])

  });


  constructor(private directoresServices: directoresService) { }

  ngOnInit(): void {
    this.directoresServices.directoresSelect().subscribe(
      (res: any) => {
        // console.log(res);
        this.listaDirectores = JSON.parse(JSON.stringify(res))
      }
    );
  }
  

  directoresInsert(values: any) {
    this.directoresServices.directoresInsert(values.nombres, values.peliculas).subscribe(() => {
      // console.log(res)
      this.ngOnInit();
      this.directoresInsertForm.reset()
    })
  }
  
  editarDirector(item: Director) {
    this.directorActualizar = item;
  }

  
  eliminarDirector(item: Director) {
    this.directorEliminar = item;
  }

  directoresUpdate(values: any) {
    this.directoresServices.directoresUpdate(values.nombres, values.peliculas, values.iddirector).subscribe();
  }

  directoresDelete() {
    this.directoresServices.directoresDelete(this.directorEliminar.iddirector).subscribe();
    this.ngOnInit(); 
  }
}
