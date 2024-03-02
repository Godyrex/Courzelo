import {Component, OnInit} from '@angular/core';
import {PanelService} from "../../../service/user/admin/panel.service";
import {UserResponse} from "../../../model/user/UserResponse";
import {UserRoleRequest} from "../../../model/user/UserRoleRequest";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  constructor() {
  }

}
