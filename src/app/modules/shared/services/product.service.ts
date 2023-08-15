import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryElement} from "../../category/components/category/categoryElement.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/products`);
  }

  // saveCategory(category: CategoryElement): Observable<any>{
  //   return this.http.post<any>(`${this.baseUrl}/categories`, category);
  // }
  //
  // updateCategory(category: CategoryElement, id: number): Observable<any>{
  //   return this.http.put<any>(`${this.baseUrl}/categories/${id}`, category);
  // }
  //
  // deleteCategory(id: number): Observable<any>{
  //   return this.http.delete<any>(`${this.baseUrl}/categories/${id}`);
  // }
  //
  // getCategoryById(id: number): Observable<any>{
  //   return this.http.get<any>(`${this.baseUrl}/categories/${id}`);
  // }

}
