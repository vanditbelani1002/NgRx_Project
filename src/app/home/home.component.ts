import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup,FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { NgStyle } from '@angular/common';
import { UserService } from '../user.service';
import {MatCardModule} from '@angular/material/card';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-home',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule,MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,ReactiveFormsModule,MatTableModule,MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit{
  minDate = new Date(2000,0,1)
  maxDate = new Date()
  form!: FormGroup;
  date!: Date
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['position','name','weight','symbol'];
  fullname:string=''
  @ViewChild('datepicker') entereddate!: ElementRef
  @ViewChild('showdate') showdate!: ElementRef
  @ViewChildren('inputEl') inputEl!: QueryList<ElementRef>

  constructor(private userservice:UserService){}
  ngOnInit(): void {
    this.form= new FormGroup({
      date: new FormControl('',[]),
    });
  
    
    
  }
  onSubmit(){
    this.date =this.form.value.date;
    //  console.log(this.date);
    console.log(this.entereddate.nativeElement.value);
    this.entereddate.nativeElement.value!==''?this.showdate.nativeElement.innerText ='You Select : ' + this.entereddate.nativeElement.value:alert('Please select the date')
    
    //  console.log(`${this.date.getMonth()+1}/${this.date.getDate()}/${this.date.getFullYear()}`);
  }
  
  getName(){
    let name:string=''
    this.inputEl.forEach((el)=>{
      name+=el.nativeElement.value+' '
    })
    this.fullname= name.trim()
  }
}
