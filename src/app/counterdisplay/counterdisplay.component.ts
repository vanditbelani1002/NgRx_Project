import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterModel } from '../shared/store/counter.model';
import { getcounter } from '../shared/store/counter.selector';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-counterdisplay',
  standalone: true,
  imports: [MatBadgeModule,MatIconModule],
  templateUrl: './counterdisplay.component.html',
  styleUrl: './counterdisplay.component.css'
})
export class CounterdisplayComponent implements OnInit{
  constructor(private store:Store<{counter:counterModel}>){}

counterDisplay!: number

  ngOnInit(): void {
    
    this.store.select(getcounter).subscribe(data=>{
      this.counterDisplay=data;
      console.log("Counter Display");
    })
  }



}
