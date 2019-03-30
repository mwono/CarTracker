import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../User';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: User = {
        phone: 0,
        plate: '',
        name: '',
    }

    constructor(private serv: LoginService) { }

    Login() {
        this.serv.loginUser
    }

    ngOnInit() {
    }

}
