import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { customincrement } from '../shared/store/counter.actions';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { counterModel } from '../shared/store/counter.model';
import { getname } from '../shared/store/counter.selector';
import { AppstateModel } from '../shared/store/global/appstate.model';
import {  MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customcounter',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatSelectModule,MatButtonModule],
  templateUrl: './customcounter.component.html',
  styleUrl: './customcounter.component.css'
})
export class CustomcounterComponent implements OnInit{

  constructor(private store:Store<AppstateModel>){}
  counterinput !:number
  actiontype = 'add'
    form !:FormGroup
  onCustomincrement(){
    this.store.dispatch(customincrement({vlaue: +this.counterinput,action:this.actiontype}))
  }

  name!: string
  ngOnInit(): void {  
    this.form = new FormGroup({
      counernumber : new FormControl(null)
    }); 
    this.store.select(getname).subscribe(data=>{
      console.log("Custom Counter") 
      this.name=data
  }
)}
}
