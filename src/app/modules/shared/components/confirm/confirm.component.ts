import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit{

  dialogRef: MatDialogRef<ConfirmComponent> = inject(MatDialogRef);
  data: any = inject(MAT_DIALOG_DATA);
  private categoryService: CategoryService = inject(CategoryService);

  ngOnInit(): void {

  }

  onNoClick(): void{
    this.dialogRef.close(3);
  }

  delete(): void{

    if( this.data != null ){
      this.categoryService.deleteCategory(this.data.id).subscribe( response => {
        console.log(response)
        this.dialogRef.close(1);
      }, error => {
        this.dialogRef.close(2);
        console.log("error al eliminar la categoría", error)
      });
    }
    else{
      this.dialogRef.close(2);
    }

  }

}
