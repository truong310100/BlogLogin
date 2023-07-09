import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  articles: any;
  constructor( private data: DataService) { }

  ngOnInit(): void {
    this.data.getAll()
      .subscribe(
        res=>{
          this.articles = res;
        },
        err=>{
          console.log(err);
        }
      )
  }

}
