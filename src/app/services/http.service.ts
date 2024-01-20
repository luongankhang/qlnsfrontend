import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { NhanVien } from '../models/nhanvien.model';
import { PhongBan } from '../models/phongban.model';
import { NhanVienOfPhongBan } from '../models/nhanvienofphongban.model';
import { LichDiLam } from '../models/lichdilam.model';
import { ChamCong } from '../models/chamcong.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private REST_API_SERVER = environment.REST_API_SERVER;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status},
       Message: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }

  public getNhanViens(): Observable<NhanVien[]> {
    const url = `${this.REST_API_SERVER}/api/nhanvien`;
    return this.http
      .get<NhanVien[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getPhongBans(): Observable<PhongBan[]> {
    const url = `${this.REST_API_SERVER}/api/phongban`;
    return this.http
      .get<PhongBan[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getNVOFPBs(): Observable<NhanVienOfPhongBan[]> {
    const url = `${this.REST_API_SERVER}/api/of`;
    return this.http
      .get<NhanVienOfPhongBan[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getLichDiLams(): Observable<LichDiLam[]> {
    const url = `${this.REST_API_SERVER}/api/lich`;
    return this.http
      .get<LichDiLam[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getChamCongs(): Observable<ChamCong[]> {
    const url = `${this.REST_API_SERVER}/api/chamcong`;
    return this.http
      .get<ChamCong[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public create(param: any, body: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/${param}`;
    return this.http
      .post<any>(url, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public update(param: any, id: any, body: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/${param}/${id}`;
    return this.http
      .put<any>(url, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public delete(param: any, id: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/${param}/${id}`;
    return this.http
      .delete<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public timKiemNhanVien(param: any, query: string): Observable<NhanVien[]> {
    const url = `${this.REST_API_SERVER}/api/${param}/tenNhanVien?tenNhanVien=${query}`;
    return this.http
      .get<NhanVien[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public timKiemPhongBan(param: any, query: string): Observable<PhongBan[]> {
    const url = `${this.REST_API_SERVER}/api/${param}/tenPhongBan?tenPhongBan=${query}`;
    return this.http
      .get<PhongBan[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public timKiemNVOFPB(
    param: any,
    query: string
  ): Observable<NhanVienOfPhongBan[]> {
    const url = `${this.REST_API_SERVER}/api/${param}/tenNhanVien?tenNhanVien=${query}`;
    return this.http
      .get<NhanVienOfPhongBan[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
