import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ProductElement} from "./product.interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../shared/services/product.service";
import {NewProductComponent} from "../new-product/new-product.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource: MatTableDataSource<ProductElement> = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.productService.getProducts().subscribe( data => {
      this.processProductsResponse(data);
      console.log("products", data)
    }, error => {
      console.log("error categorias", error)
    });
  }

  processProductsResponse(resp: any): void{

    let dataProducts: ProductElement[] = [];

    if( resp.metadata[0].code == '00' ){

      let listProducts = resp.product.products;

      listProducts.forEach( (product: ProductElement): void => {

        product.category = product.category.name;
        product.picture = 'data:image/jpeg;base64,' + product.picture;

        dataProducts.push(product);
      });

      this.dataSource = new MatTableDataSource<ProductElement>(dataProducts);
      this.dataSource.paginator = this.paginator;
    }

  }

  openProductDialog(id: number, name: string = '', description: string = ''): void{

    let dialogRef: MatDialogRef<any>;
    let msg: string = '';
    let msgError: string = '';

    if( id != 0 && name.trim().length > 0 && description.trim().length > 0 ){

      console.log("actualizar")

      msg = 'Producto actualizado';
      msgError = 'Se produjo un error al actualizar el producto';

      dialogRef = this.dialog.open( NewProductComponent, {
        width: '450px',
        data: {id: id, name: name, description: description}
      });
    }
    else{

      msg  = 'Producto agregado"';
      msgError = 'Se produjo un error al guarda el producto';

      dialogRef = this.dialog.open( NewProductComponent, {
        width: '450px'
      });
    }

    dialogRef.afterClosed().subscribe( result => {

      if( result == 1 ){

        this.openSnackBar(msg, "Exitosa");
        this.getProducts();

      }else if( result == 2 ){
        this.openSnackBar(msgError, "Error");
      }

      console.log("se cerro el modal")
    })

  }

  edit(product: ProductElement): void{

    // this.openCategoryDialog(category.id!, category.name, category.description);

  }

  delete(product: ProductElement): void{

    // let dialogRef: MatDialogRef<any>;
    //
    // dialogRef = this.dialog.open( ConfirmComponent, {
    //   width: '450px',
    //   data: {id: category.id}
    // });
    //
    // dialogRef.afterClosed().subscribe( result => {
    //
    //   if( result == 1 ){
    //
    //     this.openSnackBar("Categoría eliminada", "Exitosa");
    //     this.getCategories();
    //
    //   }else if( result == 2 ){
    //     this.openSnackBar("Se produjo un error al eliminar la categoría", "Error");
    //   }
    //
    // });
  }

  buscar(term: string): void{

    // if(term.length === 0){
    //   return this.getCategories();
    // }
    //
    // let id: number = +term;
    // if( isNaN(id) ) return this.getCategories();
    //
    // this.categoryService.getCategoryById(+term).subscribe( response => {
    //   this.processCategoriesResponse(response);
    // });

  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{

    return this.snackBar.open(message, action, {
      duration: 2000
    });

  }

}
