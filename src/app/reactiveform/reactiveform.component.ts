  import { NgIf } from '@angular/common';
  import { Component, OnInit } from '@angular/core';
  import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
  import { HttpClient, HttpClientModule } from '@angular/common/http';
  import { MatButtonModule } from '@angular/material/button';
  import { MatInputModule } from '@angular/material/input';
  import { MatFormFieldModule } from '@angular/material/form-field';

  @Component({  
    selector: 'app-reactiveform',
    standalone: true,
    imports: [ReactiveFormsModule,NgIf,HttpClientModule,MatButtonModule,MatInputModule,MatFormFieldModule],
    templateUrl: './reactiveform.component.html',
    styleUrl: './reactiveform.component.css'
  })
  export class ReactiveformComponent implements OnInit{
    constructor(private http:HttpClient){}
    reactiveform!: FormGroup;
    password!: string
    isSubmitted:boolean=false
    ngOnInit(): void {
        this.reactiveform= new FormGroup({
          name: new FormControl('',[Validators.required,this.firstletter]),
          password: new FormControl(null,Validators.minLength(8)),
          email: new FormControl(null,Validators.email)
        });
        console.log(this.reactiveform);
    }

    onSubmit(){
      this.password = this.reactiveform.value.password
      const formData =new FormData()
      // console.log(formData);
      
      // console.log(this.password);
      // console.log(this.password.charAt(0) ===  this.password.charAt(0).toUpperCase() && this.password.charAt(1) ===  this.password.charAt(1).toUpperCase() && this.password.charAt(2) ===  this.password.charAt(2).toUpperCase());
      console.log(this.reactiveform);
      this.isSubmitted=true
    }

    firstletter(control: AbstractControl) {
      if (control.value.startsWith('')) {
        return null;
      }
      return { 'firstletter': 'this is an error' };
    }

    onChangeFile(event:any){
      if(event.target.files.length>0){
        const file = event.target.files[0];
        if(file.type=="image/jpeg"){
        const formData = new FormData()
        formData.append('file',file)
        this.http.post('https://api.escuelajs.co/api/v1/files/upload',formData).subscribe((res:any)=>{
        })
      }
      else{
        alert('Please Upload only JPEG File')
      }
      } 
    }

    canExit(){
      if(this.reactiveform.value.name || this.reactiveform.value.password || this.reactiveform.value.email ){
        return confirm('Are You Want to Redirect?')
      }
      else{
        return true
      }
    }

  }
