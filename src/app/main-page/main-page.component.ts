import { Component, OnInit } from '@angular/core';
import { MainService } from '../main-service.service';
import { Subscription, interval } from 'rxjs';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
    capacity: number = 0;
    maxCapacity: number = 0;
    ParkingLots: string[] = ['A', 'B', 'C'];
    CurrentLot: string = 'A';
    users: string[] = [];
    unknownUsers: string[] = [];

    selectedUsers: string[] = [];
    selectedUnknownUsers: string[] = [];

    private updateSubscription: Subscription;

    constructor(private serv: MainService) { }

    updateUsers() {
        this.serv.SendUpdate(this.CurrentLot, this.capacity).subscribe((res) => {
            if (res.response == "Success") {
                window.alert("Successfully sent update");
            } else {
                window.alert("Failed to send alert");
            }
            console.log(res);
        });
    }

    update() {
        this.serv.GetRegistered(this.CurrentLot).subscribe((users) => {
            for (let u of users) {
              if (!this.users.includes(u.plate) && u.plate.length > 0) {
                this.users.push(u.plate);
                this.capacity++;
              }
            }
        });
        this.serv.GetUnregistered(this.CurrentLot).subscribe((unreg) => {
            for (let u of unreg) {
              if (!this.unknownUsers.includes(u.plate) && u.plate.length > 0) {
                this.unknownUsers.push(u.plate);
                this.capacity++;
              }
            }
        });
    }

    addEntryToList(user: string) {
        var plate = user;
        if (this.selectedUsers.includes(plate)) {
            this.selectedUsers.splice(this.selectedUsers.indexOf(plate, 0));
        } else {
            this.selectedUsers.push(plate);
        }
        console.log(this.selectedUsers);
    }

    addUnknownToList(user: string) {
        var plate = user;
        if (this.selectedUnknownUsers.includes(plate)) {
            this.selectedUnknownUsers.splice(this.selectedUnknownUsers.indexOf(plate, 0));
        }
        else {
            this.selectedUnknownUsers.push(plate);
        }
        console.log(this.selectedUnknownUsers);
    }

    deleteEntry() {
        this.serv.deleteUsers(this.selectedUsers).subscribe((users) => {
            for (let u of users) {
              if (!this.users.includes(u)) {
                this.users.push(u);
              }
            }
        });
    }

    deleteUnknownEntry() {
        this.serv.deleteUsers(this.selectedUnknownUsers).subscribe((users) => {
            // this.unknownUsers = [];
            for (let u of users) {
              if (!this.unknownUsers.includes(u)) {
                this.unknownUsers.push(u);
              }
            }
        });
    }

    getCurrentLot() {
        this.serv.GetCurrentLot(this.CurrentLot).subscribe((res) => {
            this.maxCapacity = res.response;
        });
        this.update();
    }

    ngOnInit() {
      this.getCurrentLot();
        this.updateSubscription = interval(10000).subscribe(() => {
            this.update();
        });
    }

    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }

}
