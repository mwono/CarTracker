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
            this.selectedUsers.splice(this.selectedUsers.indexOf(plate), 1);
        } else {
            this.selectedUsers.push(plate);
        }
        console.log(this.selectedUsers);
    }

    addUnknownToList(user: string) {
        var plate = user;
        if (this.selectedUnknownUsers.includes(plate)) {
            this.selectedUnknownUsers.splice(this.selectedUnknownUsers.indexOf(plate), 1);
        }
        else {
            this.selectedUnknownUsers.push(plate);
        }
        console.log(this.selectedUnknownUsers);
    }

    deleteEntry() {
        this.serv.deleteUsers(this.selectedUsers, true).subscribe((res) => {
          for (let i of this.selectedUsers) {
            this.users.splice(this.users.indexOf(i), 1);
            this.capacity--;
          }
          this.selectedUsers.length = 0;
        });
    }

    deleteUnknownEntry() {
        this.serv.deleteUsers(this.selectedUnknownUsers, false).subscribe((res) => {
          for (let i of this.selectedUnknownUsers) {
            this.unknownUsers.splice(this.unknownUsers.indexOf(i), 1);
            this.capacity--;
          }
          this.selectedUnknownUsers.length = 0;
        });
    }

    getCurrentLot() {
        switch (this.CurrentLot) {
            case 'A':this.maxCapacity = 100;
            break;
            case 'B':this.maxCapacity = 50;
            break;
            case 'C':this.maxCapacity = -1;
            break;
        }
        // this.serv.GetCurrentLot(this.CurrentLot).subscribe((res) => {
        //     this.maxCapacity = res.response;
        // });
        if (this.maxCapacity > 50) {
            this.update();
        } else {
            this.users.length = 0;
            this.unknownUsers.length = 0;
        }
    }

    ngOnInit() {
        this.getCurrentLot();
        if (this.maxCapacity > 50) {
            this.updateSubscription = interval(30000).subscribe(() => {
                this.update();
            });
        }
    }

    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }

}
