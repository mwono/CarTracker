import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { MainService } from '../main-service.service';
import { getLocaleTimeFormat } from '@angular/common';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  capacity = 0;
  ParkingLots: string[] = ['Lot A', 'Lot B', 'Lot C'];
  CurrentLot: '';
  users: User[] = [
    {
      phone: 123,
      plate: 'abc'
    },
    {
      phone: 456,
      plate: 'def'
    },
  ];
  unknowns: string[] = ['abc', 'def', 'hij'];

  private updateSubscription: Subscription;

  constructor(private serv: MainService) { }

  updateUsers() {
    this.serv.SendUpdate(this.CurrentLot).subscribe((res) => {
      console.log(res);
    });
  }

  update() {
    this.serv.GetCapacity(this.CurrentLot).subscribe((res) => {
      this.capacity = res;
    });
    this.serv.GetRegistered(this.CurrentLot).subscribe((users) => {
      for (let u of users) {
        this.users.push(u);
      }
    });
    this.serv.GetUnregistered(this.CurrentLot).subscribe((unreg) => {
      for (let u of unreg) {
        this.unknowns.push(u);
      }
    });
  }

  ngOnInit() {
    this.updateSubscription = interval(100000).subscribe((val) => {
      this.update();
    });
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

}
