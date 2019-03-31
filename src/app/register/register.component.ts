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
    plate: '',
    name: ''
  };

  public mask = ['(',/[1-9]/,/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/];

  constructor(private serv: RegisterService) { }

  Register() {
    if (this.user.phone.toString().length == 10 &&
    this.user.name &&
    this.user.plate &&
    this.user.plate.length <= 7) {
      this.serv.CreateNewUser(this.user).subscribe((res) => {
        if (res.response == "Already exists!") {
          window.alert("Failed to register, plate already exists");
        } else if (res.response == "Successfully added to DB.") {
          window.alert("Successfully registered");
        } else {
          window.alert("Failed to register");
        }
        this.user.phone = 0;
        this.user.plate = '';
        this.user.name = '';
        console.log(res);
      });
    } else {
      window.alert("Please fill in all fields");
    }
  }

  ngOnInit() {
  }

}
