import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    phone: 0,
    plate: ''
  };

  constructor(private serv: RegisterService) { }

  register() {
    this.serv.CreateNewUser(this.user).subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit() {
  }

}
