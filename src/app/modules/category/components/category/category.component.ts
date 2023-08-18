import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryElement} from "./categoryElement.interface";
import {MatTableDataSource} from "@angular/material/table";
import {DialogRef} from "@angular/cdk/dialog";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NewCategoryComponent} from "../new-category/new-category.component";
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material/snack-bar";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ConfirmComponent} from "../../../shared/components/confirm/confirm.component";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<CategoryElement> = new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
      this.dataSource.paginator = this.paginator;

    }

  }

  openCategoryDialog(id: number, name: string = '', description: string = ''): void{

    let dialogRef: MatDialogRef<any>;
    let msg: string = '';
    let msgError: string = '';

    if( id != 0 && name.trim().length > 0 && description.trim().length > 0 ){

      console.log("actualizar")

      msg = 'Categoría actualizada';
      msgError = 'Se produjo un error al actualizar la categoría';

      dialogRef = this.dialog.open( NewCategoryComponent, {
        width: '450px',
        data: {id: id, name: name, description: description}
      });
    }
    else{

       msg  = 'Categoría agregada"';
       msgError = 'Se produjo un error al guarda la categoría';

     dialogRef = this.dialog.open( NewCategoryComponent, {
        width: '450px'
      });
    }

    dialogRef.afterClosed().subscribe( result => {

      if( result == 1 ){

        this.openSnackBar(msg, "Exitosa");
        this.getCategories();

      }else if( result == 2 ){
        this.openSnackBar(msgError, "Error");
      }

      console.log("se cerro el modal")
    })

  }

  edit(category: CategoryElement): void{

    this.openCategoryDialog(category.id!, category.name, category.description);

  }

  delete(category: CategoryElement): void{

    let dialogRef: MatDialogRef<any>;

    dialogRef = this.dialog.open( ConfirmComponent, {
      width: '450px',
      data: {id: category.id, module: "category"}
    });

    dialogRef.afterClosed().subscribe( result => {

      if( result == 1 ){

        this.openSnackBar("Categoría eliminada", "Exitosa");
        this.getCategories();

      }else if( result == 2 ){
        this.openSnackBar("Se produjo un error al eliminar la categoría", "Error");
      }

    });
  }

  buscar(term: string): void{

    if(term.length === 0){
      return this.getCategories();
    }

    let id: number = +term;
    if( isNaN(id) ) return this.getCategories();

    this.categoryService.getCategoryById(+term).subscribe( response => {
        this.processCategoriesResponse(response);
    });

  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{

    return this.snackBar.open(message, action, {
      duration: 2000
    });

  }

}
