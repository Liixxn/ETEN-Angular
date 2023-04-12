import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {

  email_autentication: string = '';
  password_autentication: string = '';
  constructor(private http: HttpClient) { }

  onSubmit() {
    const url = 'http://127.0.0.1:8000/api/';
    this.email_autentication = (<HTMLInputElement>document.getElementById('email_autentication')).value;
    this.password_autentication = (<HTMLInputElement>document.getElementById('password_autentication')).value;
    const body = { email: this.email_autentication, password: this.password_autentication };

    alert(this.email_autentication + ' ' + this.password_autentication)

    this.http.post(url, body).subscribe(
      (response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);
        // redireccionar al usuario a la página principal
        alert('EXITO')

      },
      (error) => {
        console.error(error);
        alert('FRACASO')
      }
    );

  }


}










