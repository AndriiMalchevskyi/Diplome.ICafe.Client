import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-personalcard',
  templateUrl: './personalCard.component.html',
  styleUrls: ['./personalCard.component.css']
})
export class PersonalCardComponent implements OnInit {
  @Input() public user: User;
  havePhoto = false;
  constructor() { }

  ngOnInit() {
    this.user = new User(this.user);
  }

  isWaiter() {
    return this.user.hasRole('waiter');
  }

  Call(event: any) {
    console.log('Call ' + event);
  }
}
