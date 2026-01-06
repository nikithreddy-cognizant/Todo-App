import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UserI } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  
  constructor(public authService: AuthService, private router: Router) {}

  user:UserI|null =null
  user$!: Observable<UserI | null>;
  


  ngOnInit():void{
    this.user$ = this.authService.currentUser$;
  }

  

  logoutHandler() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
