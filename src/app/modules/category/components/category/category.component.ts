import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryElement} from "./categoryElement.interface";
import {MatTableDataSource} from "@angular/material/table";
import {DialogRef} from "@angular/cdk/dialog";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NewCategoryComponent} from "../new-category/new-category.component";
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<CategoryElement> = new MatTableDataSource<CategoryElement>();

  constructor(private categoryService: CategoryService, public dialog: MatDialog, private snackBar: MatSnackBar) {
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

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);

    }

  }

  openCategoryDialog(): void{

    const dialogRef: MatDialogRef<any> = this.dialog.open( NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe( result => {

      if( result == 1 ){

        this.openSnackBar("Categoría agregada", "Exitosa");
        this.getCategories();

      }else if( result == 2 ){
        this.openSnackBar("Se produjo un error al guarda la categoría", "Error");
      }

      console.log("se cerro el modal")
    })

  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{

    return this.snackBar.open(message, action, {
      duration: 2000
    });

  }

}
