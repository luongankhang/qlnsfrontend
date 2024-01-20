export interface ChamCong {
  chamCongId: string;
  nhanVienId: string;
  tienLuong: number;
  tenNhanVien?: string;
  phongBan?: string;
  ngayBatDau?: Date;
  ngayKetThuc?: Date;
}
