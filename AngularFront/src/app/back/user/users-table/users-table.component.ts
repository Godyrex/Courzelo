import {Component, OnInit} from '@angular/core';
import {UserResponse} from "../../../model/user/UserResponse";
import {UserRoleRequest} from "../../../model/user/UserRoleRequest";
import {PanelService} from "../../../service/user/admin/panel.service";
import {UserListDTO} from "../../../model/user/UserListDTO";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  userResponse: UserResponse[] = []
  selectedRole: string = "";
  availableRoles: string[] = ['STUDENT', 'TEACHER', 'ADMIN', 'SUPERADMIN']
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;

  constructor(private panelService: PanelService) {
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
        console.error('Error fetching users:', error);
      }
    );
  }

  toggleBan(user: UserResponse): void {
    const userRoleRequest: UserRoleRequest = {userID: user.id};
    this.panelService.toggleBan(userRoleRequest).subscribe(
      () => {
        user.ban = !user.ban;
      },
      (error: any) => {
        console.error('Error toggling ban:', error);
      }
    );
  }

  toggleEnable(user: UserResponse): void {
    const userRoleRequest: UserRoleRequest = {userID: user.id};
    this.panelService.toggleEnable(userRoleRequest).subscribe(
      () => {
        user.enabled = !user.enabled;
      },
      (error: any) => {
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
        },
        (error: any) => {
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
        },
        (error: any) => {
          console.error('Error adding role:', error);
        }
      );
    }
  }
}
