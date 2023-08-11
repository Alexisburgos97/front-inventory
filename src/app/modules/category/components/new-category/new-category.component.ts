import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../shared/services/category.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{

  public categoryForm! : FormGroup;
  private fb: FormBuilder = inject(FormBuilder);
  private categoryService: CategoryService = inject(CategoryService);
  public dialogRef: MatDialogRef<NewCategoryComponent> = inject(MatDialogRef<NewCategoryComponent>);

  ngOnInit(): void {

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  onSave(): void{

    let data: {name: string, description: string} = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    };

    this.categoryService.saveCategory(data).subscribe( response => {
      console.log(response)
      this.dialogRef.close(1);
    }, error => {
      console.log("error new category");
      this.dialogRef.close(2);
    });

  }

  onCancel(): void{
    this.dialogRef.close(3);
  }

}
