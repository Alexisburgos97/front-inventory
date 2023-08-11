import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../shared/services/category.service";
import {CategoryElement} from "./categoryElement.interface";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<CategoryElement> = new MatTableDataSource<CategoryElement>();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void{
    this.categoryService.getCategories().subscribe( data => {
      this.processCategoriesResponse(data);
      console.log("categorias", data)
    }, error => {
      console.log("error categorias", error)
    });
  }

  processCategoriesResponse(resp: any): void{

    let dataCategory: CategoryElement[] = [];

    if( resp.metadata[0].code == '00' ){

      let listCategories = resp.categoryResponse.category;

      listCategories.forEach( (category: CategoryElement): void => {
        dataCategory.push(category);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>();

    }

  }

}
