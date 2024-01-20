import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-phongban-them',
  template: `<div class="container-fluid">
    <div class="card">
      <div class="card-body">
        <form class="row g-3" [formGroup]="reacForm">
          <div class="col-12">
            <label for="exampleInputUsername1" class="form-label"
              >Tên phòng ban</label
            >
            <input
              type="text"
              class="form-control"
              formControlName="tenPhongBan"
            />
          </div>
          <div class="col-12">
            <label for="exampleInputUsername1" class="form-label"
              >Mô tả phòng ban</label
            >
            <textarea
              style="height: 10vh"
              type="text"
              class="form-control"
              formControlName="moTaPhongBan"
            ></textarea>
          </div>
          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary me-2"
              (click)="themPhongBan($event)"
            >
              Thêm thông tin
            </button>
            <a href="phongban-danhsach" class="btn btn-light">Hủy</a>
          </div>
        </form>
      </div>
    </div>
  </div> `,
})
export class PhongbanThemComponent implements OnInit {
  public reacForm!: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.reacForm = this.fb.group({
      tenPhongBan: [],
      moTaPhongBan: [],
    });
  }

  public themPhongBan(event: any) {
    const phongBan = {
      tenPhongBan: this.reacForm.get('tenPhongBan')?.value,
      moTaPhongBan: this.reacForm.get('moTaPhongBan')?.value,
    };
    this.http.create('phongban', phongBan).subscribe(
      (res) => {
        alert(res.message);
        this.router.navigate(['/phongban-danhsach']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
