import { Component } from '@angular/core';
import { iUser } from '../../Models/i-user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  user!: iUser;
  allUsers: iUser[] = [];

  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });

    this.authSvc.getAllUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

}
