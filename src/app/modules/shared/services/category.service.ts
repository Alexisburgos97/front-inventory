import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";
import {CategoryElement} from "../../category/components/category/categoryElement.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/categories`);
  }

  saveCategory(category: CategoryElement): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/categories`, category);
  }

  updateCategory(category: CategoryElement, id: number): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/categories/${id}`);
  }

  getCategoryById(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/categories/${id}`);
  }

}
