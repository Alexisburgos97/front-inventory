import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit{

  dialogRef: MatDialogRef<ConfirmComponent> = inject(MatDialogRef);
  data: any = inject(MAT_DIALOG_DATA);
  private categoryService: CategoryService = inject(CategoryService);
  private productService: ProductService = inject(ProductService);

  ngOnInit(): void {

  }

  onNoClick(): void{
    this.dialogRef.close(3);
  }

  delete(): void{

    if( this.data != null ){

      switch (this.data.module){

        case 'category':
          this.categoryService.deleteCategory(this.data.id).subscribe( response => {
            console.log(response)
            this.dialogRef.close(1);
          }, error => {
            this.dialogRef.close(2);
            console.log("error al eliminar la categoría", error)
          });
          break;

        case 'product':
          this.productService.deleteProduct(this.data.id).subscribe( response => {
            console.log(response)
            this.dialogRef.close(1);
          }, error => {
            this.dialogRef.close(2);
            console.log("error al eliminar el producto", error)
          });
          break;
      }


    }
    else{
      this.dialogRef.close(2);
    }

  }

}
