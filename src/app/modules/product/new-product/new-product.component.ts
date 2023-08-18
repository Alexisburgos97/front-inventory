import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../shared/services/product.service";
import {CategoryService} from "../../shared/services/category.service";
import {CategoryElement} from "../../category/components/category/categoryElement.interface";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

  estadoFormulario: string = 'Agregar';
  public productForm! : FormGroup;
  private fb: FormBuilder = inject(FormBuilder);
  private productService: ProductService = inject(ProductService);
  private categoryService: CategoryService = inject(CategoryService);
  public dialogRef: MatDialogRef<NewProductComponent> = inject(MatDialogRef<NewProductComponent>);
  public data: any = inject(MAT_DIALOG_DATA);
  categories: CategoryElement[] = [];
  selectedFile: any;
  nameImg: string = "";

  ngOnInit(): void {

    this.getCategories();

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required]
    });

    if( this.data != null ){
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar'
    }

  }

  onSave(): void{

    let data: {name: string, price: string, account: string, category: string, picture: any} = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile
    };

    console.log(this.selectedFile)
    console.log(data)

    const uploadImageData: FormData = new FormData();
    uploadImageData.append('picture', data.picture, this.nameImg);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('account', data.account);
    uploadImageData.append('categoryId', data.category);


    //Actualizar
    if( this.data != null ){

      console.log("data 2", data)

      /*this.dialogRef.updateProduct(data, this.data.id).subscribe( response => {
        console.log("actualizar",response)
        this.dialogRef.close(1);
      }, error => {
        console.log("error new category update");
        this.dialogRef.close(2);
      });*/

    }
    //Guardar
    else{

      this.productService.saveProduct(uploadImageData).subscribe( response => {
        console.log(response)
        this.dialogRef.close(1);
      }, error => {
        console.log(`error new product save ${error}`);
        this.dialogRef.close(2);
      });

    }



  }

  onCancel(): void{
    this.dialogRef.close(3);
  }

  updateForm(data: any): void{

    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    });

  }

  getCategories(): void{
    this.categoryService.getCategories().subscribe( data => {

      this.categories = data.categoryResponse.category;

    }, error => {
      console.log(error)
    });
  }

  onFileChanged(event: any): void{

    if( event.target.files[0] != null ){

      this.selectedFile = event.target.files[0];

      this.nameImg = this.selectedFile.name;
    }

  }

}
