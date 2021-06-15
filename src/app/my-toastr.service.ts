import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MyToastrService {

  constructor(private toastr: ToastrService) {

  }
  errorHandling(err:any) {
    if (err.status === 400) {
      this.toastr.error(`${err.error.description}`, 'Помилка', {progressBar: true})
    } else if (err.status === 401) {
      this.toastr.error('Неавторизований юзер (можливо прострочений токен)', `Помилка`, {progressBar: true})
    } else {
      this.toastr.error(`${err.message}`, 'Помилка', { progressBar: true })
    }
  }
  successMessage(mes: string) {
    this.toastr.success(mes, 'Успіх', {timeOut: 2000})
  }
}
