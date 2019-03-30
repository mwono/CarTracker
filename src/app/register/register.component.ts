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

  constructor(private serv: RegisterService) { }

  Register() {
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
  }

  ngOnInit() {
  }

}
