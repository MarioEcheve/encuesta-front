import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestEncuesta } from './request/request-encuesta';
import { ResponseEncuesta } from './response/response';
import { EncuestaService } from './services/encuesta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['email', 'style'];
  dataSource = [];
  encuestaForm = new FormGroup({});
  loading:boolean=false;
  showForm:boolean=true;
  constructor(private encuestaService : EncuestaService,
              private _snackBar: MatSnackBar,
              private formBuilder: FormBuilder){
    this.initForm();
  }
  ngOnInit(): void {
      this.findAll();
  }
  initForm(){
    this.encuestaForm = this.formBuilder.group({
      mail : ['', [Validators.required,Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      style : ['',[Validators.required, Validators.minLength(3)]]
    });
  }
  snackBar(message: string, action: string){
    this._snackBar.open(message, action,{
      duration : 3000
    });
  }
  showFeedBack(message: string, action: string,status:string) {
    switch (status) {
      case 'success':
        this.snackBar(message,action);
        break;
      case 'failure':
        this.snackBar(message,action);
        break;
    }
  }
  async save(){
    this.loading=true;
    let encuesta = new RequestEncuesta();
    encuesta.mail=this.encuestaForm.controls['mail'].value;
    encuesta.style=this.encuestaForm.controls['style'].value;
    this.encuestaService.create(encuesta).subscribe((encuesta : ResponseEncuesta)=>{
        this.showFeedBack('Ingresado con exito', 'salir',encuesta.status);
        this.loading=false;
        this.encuestaForm.reset();
        this.findAll();
    },()=>{
      this.showFeedBack('Error al ingresar', 'salir','failure');
      this.loading=false;
      this.encuestaForm.reset();

    });
  }
  showEncuestas(){
    this.showForm = false;
  }
  findAll(){
    this.encuestaService.findAll().subscribe(
      (encuestas : ResponseEncuesta) =>{
        this.dataSource = encuestas.data;
      }
    );
  }
  back(){
    this.showForm=true;
  }
  buttonBack(){

  }
}


