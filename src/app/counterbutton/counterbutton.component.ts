import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../shared/store/counter.actions';
import { counterModel } from '../shared/store/counter.model';
import { CounterdisplayComponent } from '../counterdisplay/counterdisplay.component';
import { CustomcounterComponent } from '../customcounter/customcounter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-counterbutton',
  standalone: true,
  imports: [CounterdisplayComponent,CustomcounterComponent,MatButtonModule,MatIconModule,MatCardModule],
  templateUrl: './counterbutton.component.html',
  styleUrl: './counterbutton.component.css'
})
export class CounterbuttonComponent {
 constructor(private store:Store<{counter:counterModel}>){}

    onIncrement(){
      this.store.dispatch(increment())
      
      
    }
    onDecrement(){
      this.store.dispatch(decrement())
      
    }
    onReset(){
      this.store.dispatch(reset())
    }

}
