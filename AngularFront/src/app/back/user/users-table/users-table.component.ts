import {Component, OnInit} from '@angular/core';
import {UserResponse} from "../../../model/user/UserResponse";
import {UserRoleRequest} from "../../../model/user/UserRoleRequest";
import {PanelService} from "../../../service/user/admin/panel.service";
import {UserListDTO} from "../../../model/user/UserListDTO";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {UserProfileDialogComponent} from "../user-profile-dialog/user-profile-dialog.component";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  userResponse: UserResponse[] = []
  selectedRole: string = "";
  availableRoles: string[] = ['SUPERADMIN', 'ADMIN', 'STUDENT', 'TEACHER']
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 4;

  constructor(private panelService: PanelService,
              private toaster: ToastrService,
              public dialog: MatDialog) {
  }
  openUserProfile(email: string): void {
    this.dialog.open(UserProfileDialogComponent, {
      data: { email: email }
    });
  }
  ngOnInit(): void {
    this.loadUsers();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log("page changed from paginator" + page)
    this.loadUsers();
  }

  loadUsers(): void {
    this.panelService.getUsers(this.currentPage, this.pageSize).subscribe(
      (response: UserListDTO) => {
        this.userResponse = response.userResponse!;
        console.log("user in page " + this.currentPage + " :" + response.userResponse)
        this.totalPages = response.totalPages!;
        console.log("total number of pages : " + response.totalPages)
      },
      (error: any) => {
        this.toaster.error("Error fetching users", "Error")
        console.error('Error fetching users:', error);
      }
    );
  }

  toggleBan(user: UserResponse): void {
    const userRoleRequest: UserRoleRequest = {userID: user.id};
    this.panelService.toggleBan(userRoleRequest).subscribe(
      () => {
        user.security!.ban = !user.security?.ban;
        this.toaster.success("User "+user.email+" (un)banned successfully", "Success")
      },
      (error: any) => {
        this.toaster.error("User "+user.email+" could not be (un)banned", "Error")
        console.error('Error toggling ban:', error);
      }
    );
  }

  toggleEnable(user: UserResponse): void {
    const userRoleRequest: UserRoleRequest = {userID: user.id};
    this.panelService.toggleEnable(userRoleRequest).subscribe(
      () => {
        user.security!.enabled = !user.security?.enabled;
        this.toaster.success("User "+user.email+" enabled/disabled successfully", "Success");
      },
      (error: any) => {
        this.toaster.error("User "+user.email+" could not be enabled/disabled", "Error")
        console.error('Error toggling enable:', error);
      }
    );
  }

  changeUserRole(user: UserResponse): void {
    const userRoleRequest: UserRoleRequest = {userID: user.id, role: this.selectedRole};
    if (user.roles && user.roles.includes(this.selectedRole)) {
      this.panelService.removeRole(userRoleRequest).subscribe(
        () => {
          const index = user.roles!.indexOf(this.selectedRole);
          if (index !== -1) {
            user.roles!.splice(index, 1);
          }
          this.toaster.success("Role "+this.selectedRole+" removed from user "+user.email, "Success")
        },
        (error: any) => {
          this.toaster.error("Role "+this.selectedRole+" could not be removed from user "+user.email, "Error")
          console.error('Error removing role:', error);
        }
      );
    } else {
      this.panelService.addRole(userRoleRequest).subscribe(
        () => {
          if (!user.roles) {
            user.roles = [];
          }
          user.roles.push(this.selectedRole);
          this.toaster.success("Role "+this.selectedRole+" added to user "+user.email, "Success")
        },
        (error: any) => {
          console.error('Error adding role:', error);
          this.toaster.error("Role "+this.selectedRole+" could not be added to user "+user.email, "Error")
        }
      );
    }
  }
}
