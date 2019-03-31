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
    capacity: number = 0;
    maxCapacity: number = 0;
    ParkingLots: string[] = ['Lot A', 'Lot B', 'Lot C'];
    CurrentLot: string = '';
    users: User[] = [
        {
            phone: 123,
            plate: 'abc',
            name: 'john',

        },
        {
            phone: 456,
            plate: 'def',
            name: 'bob',

        },
    ];

    selectedUsers: string[] = [];
    selectedUnknownUsers: string[] = [];

    unknownUsers: User[] = [
        {
            plate: 'asj1'
        },
        {
            plate: 'dib5'
        },
        {
            plate: 'nbd9'
        }
    ];

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
        this.serv.GetCapacity(this.CurrentLot).subscribe((res) => {
            this.capacity = res;
        });
        this.serv.GetRegistered(this.CurrentLot).subscribe((users) => {
          this.users = [];
            for (let u of users) {
                this.users.push(u);
            }
        });
        this.serv.GetUnregistered(this.CurrentLot).subscribe((unreg) => {
          this.unknownUsers = [];
            for (let u of unreg) {
                this.unknownUsers.push(u);
            }
        });
    }

    addEntryToList(user: User) {
        var plate = user.plate;
        if (this.selectedUsers.includes(plate)) {
            this.selectedUsers.splice(this.selectedUsers.indexOf(plate, 0));
        } else {
            this.selectedUsers.push(plate);
        }
        console.log(this.selectedUsers);
    }

    addUnknownToList(user: User) {
        var plate = user.plate;
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
            this.users = [];
            for (let u of users) {
                this.users.push(u);
            }
        });
    }

    deleteUnknownEntry() {
        this.serv.deleteUsers(this.selectedUnknownUsers).subscribe((users) => {
            this.unknownUsers = [];
            for (let u of users) {
                this.unknownUsers.push(u);
            }
        });
    }

    editEntry() {

    }

    getCurrentLot() {
        this.serv.GetCurrentLot(this.CurrentLot).subscribe((res) => {
            this.maxCapacity = res.maxCapacity;
            this.users = [];
            for (let u of res.users) {
                this.users.push(u);
            }
            this.unknownUsers = [];
            for (let u of res.unknowns) {
                this.unknownUsers.push(u);
            }
        })
    }

    ngOnInit() {
        this.updateSubscription = interval(100000).subscribe(() => {
            this.update();
        });
    }

    ngOnDestroy() {
        this.updateSubscription.unsubscribe();
    }

}
