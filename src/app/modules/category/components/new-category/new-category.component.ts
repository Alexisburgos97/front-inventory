import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../shared/services/category.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{

  estadoFormulario: string = 'Agregar';
  public categoryForm! : FormGroup;
  private fb: FormBuilder = inject(FormBuilder);
  private categoryService: CategoryService = inject(CategoryService);
  public dialogRef: MatDialogRef<NewCategoryComponent> = inject(MatDialogRef<NewCategoryComponent>);
  public data: any = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    console.log( this.data )

    if( this.data != null ){
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar'
    }

  }

  onSave(): void{

    let data: {name: string, description: string} = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    };

    //Actualizar
    if( this.data != null ){

      console.log("data 2", data)

      this.categoryService.updateCategory(data, this.data.id).subscribe( response => {
        console.log("actualizar",response)
        this.dialogRef.close(1);
      }, error => {
        console.log("error new category update");
        this.dialogRef.close(2);
      });

    }
    else{

      this.categoryService.saveCategory(data).subscribe( response => {
        console.log(response)
        this.dialogRef.close(1);
      }, error => {
        console.log("error new category save");
        this.dialogRef.close(2);
      });

    }



  }

  onCancel(): void{
    this.dialogRef.close(3);
  }

  updateForm(data: any): void{

    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    });

  }

}
