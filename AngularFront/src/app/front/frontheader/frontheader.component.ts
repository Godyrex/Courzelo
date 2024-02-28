import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/user/auth/token-storage.service";

@Component({
  selector: 'app-frontheader',
  templateUrl: './frontheader.component.html',
  styleUrls: ['./frontheader.component.css']
})
export class FrontheaderComponent implements OnInit{
  constructor(private tokenStorageService: TokenStorageService) {
  }
  userRoles : string[] = [];
  auth : boolean = false;

  ngOnInit(): void {
    this.userRoles =this.tokenStorageService.getUser().roles!;
    this.auth =this.tokenStorageService.isAuthenticated();
    console.log(this.auth)
  }

}
