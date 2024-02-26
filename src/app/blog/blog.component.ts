import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogModel, blogs   } from '../shared/store/Blog/blog.model';
import { NgFor, NgIf } from '@angular/common';
import { AppstateModel } from '../shared/store/global/appstate.model';
import { getblog, getblogbyid, getbloginfo } from '../shared/store/Blog/blog.selector';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { addblog, deleteblog, loadblog, loadblogsuccess, updateblog } from '../shared/store/Blog/blog.actions';
import { HttpClientModule } from '@angular/common/http';
import { MasterService } from '../shared/store/Blog/master.services';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatSort,Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortable } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgFor,NgIf,ReactiveFormsModule,HttpClientModule,MatButtonModule,MatCardModule,MatDividerModule,MatListModule,MatTableModule,MatIconModule,MatSortModule,MatInputModule,MatFormFieldModule,RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit,AfterViewInit{

  constructor(private store:Store<AppstateModel>, private biulder:FormBuilder, private blogservie:MasterService,private _liveAnnouncer:LiveAnnouncer,private activatedRoute:ActivatedRoute ){}
  

  @ViewChild(MatSort, {static: true}) sort!: MatSort  
  blogform = this.biulder.group({
    id:this.biulder.control(0),
    title:this.biulder.control('',Validators.required),
    description:this.biulder.control('',Validators.required)
  })
  
  bloglist!:BlogModel[];
  bloginfo!:blogs;
  show:boolean=false
  displayedColumns: string[] = ['id','title','description','edit','delete','view'];
  editdata!:BlogModel
  dataSource!: MatTableDataSource<any>
  isadd: boolean =true
  blogsnumber!:number
    
  addBlog(){
    this.show=true
    this.isadd=true   
  }

  saveBlog(){
    if(this.blogform.valid){
      const _bloginput:BlogModel={
        id:(this.bloginfo.bloglist.length+1).toString(),
        title: this.blogform.value.title as string,
        description: this.blogform.value.description as string
      }
      this.store.dispatch(addblog({bloginput:_bloginput}))  
      this.close()
    }

  }

  close(){
    this.show=false
    this.blogform.reset()
  }

  updateBlog(){
    
    const _bloginput:BlogModel={
      id:(this.blogform.value.id as number)?.toString(),
      title: this.blogform.value.title as string,
      description: this.blogform.value.description as string
    } 
    this.store.dispatch(updateblog({bloginput:_bloginput})) 
    alert('blog updated successfully')
     this.show=false 
  }

  editBlog(id:number){
    this.isadd=false
    this.show=true
    // this.addBlog()
    this.store.select(getblogbyid(id)).subscribe((data)=>{
      this.editdata=data
      // console.log(this.editdata);
      this.blogform.setValue({id:parseInt(this.editdata.id),title:this.editdata.title,description:this.editdata.description})
    })
    
  }

  removeBlog(id:any){
    if(confirm('Are you sure to delete blog?')){
      this.store.dispatch(deleteblog({id:id}))
      alert('Blog is deleted successfully')
    }
  }
  viewBlog(id:any){
    // console.log(id);
  }
  
  ngOnInit(): void {
    this.store.dispatch(loadblog())
    this.store.select(getbloginfo).subscribe(item=>{
      this.bloginfo=item
      this.blogsnumber=this.bloginfo.bloglist.length
      this.dataSource= new MatTableDataSource(item.bloglist)
      this.dataSource.sort = this.sort; 
    })  
  }
  
  ngAfterViewInit(): void {
  }
  announceSortChange(sortState: Sort) {
    console.log(`The ${sortState.active} is set in ${sortState.direction===''?'Predefined':sortState.direction} order`);
    
    // if (sortState.direction) {
      //   this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      // } else {
      //   this._liveAnnouncer.announce('Sorting cleared');
      // }
  }
}