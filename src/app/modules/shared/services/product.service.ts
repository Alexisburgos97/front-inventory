import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ProductElement} from "../../product/product/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/products`);
  }

  saveProduct(product: FormData): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/products`, product);
  }

  updateProduct(product: FormData, id: number): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/products/${id}`);
  }


}
