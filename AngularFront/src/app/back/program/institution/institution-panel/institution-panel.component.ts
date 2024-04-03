import {Component, OnInit, Output} from '@angular/core';
import {InstitutionService} from "../../../../service/program/institution.service";
import {InstitutionUsersCountDTO} from "../../../../model/program/institutionUsersCountDTO";
import {InstitutionDTO} from "../../../../model/program/InstitutionDTO";
import {ToastrService} from "ngx-toastr";
import * as L from 'leaflet';
import {UpdateService} from "../../../../service/user/profile/update.service";
import {LoginResponse} from "../../../../model/user/LoginResponse";
@Component({
  selector: 'app-institution-panel',
  templateUrl: './institution-panel.component.html',
  styleUrls: ['./institution-panel.component.css']
})
export class InstitutionPanelComponent implements OnInit {
  usersCount: InstitutionUsersCountDTO = {};
  totalCount: number = 0;
  showUsersTable: boolean = false
  @Output() role: string = ""
  admins: string = "Admins"
  teachers: string = "Teachers"
  students: string = "Students"
  myInstitution: InstitutionDTO = {};
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  latitude : number = 0;
  longitude : number = 0;
  loginResponse: LoginResponse = {}
  constructor(
    private institutionService: InstitutionService,
    private toastr: ToastrService,
    private updateService: UpdateService
  ) {
  }
  ngOnInit(): void {
    this.getMyInstitution();
    this.getMyInfo();
    if(this.loginResponse.roles?.includes("ADMIN")) {
      this.countUsers();
    }
  }
  getMyInfo() {
    this.updateService.getMyInfo().subscribe(
      response => {
        this.loginResponse = response;
        console.log(response);
      }
    )
  }
  setLocation() {
    if (this.map) {
      this.map.remove();
    }
    console.log(this.myInstitution.name);
    if (this.myInstitution.latitude == 0 || this.myInstitution.longitude == 0 ||
      this.myInstitution.latitude == undefined || this.myInstitution.longitude == undefined) {
      this.toastr.warning("You Don't have a location set, setting default location.");
      this.myInstitution.latitude = 36.7832;
      this.myInstitution.longitude = 10.1843;
    }
    this.map = L.map('map').setView([this.myInstitution.latitude!, this.myInstitution.longitude!], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // ...
    }).addTo(this.map);
    // Add a marker to the map that the user can drag to set a new location
    let marker = L.marker([this.myInstitution.latitude!, this.myInstitution.longitude!], {
      draggable: true
    }).addTo(this.map);
    // Update the institution's latitude and longitude when the marker is dragged
    marker.on('dragend', () => {
      let position = marker.getLatLng();
      this.latitude = position.lat;
      this.longitude = position.lng;
      console.log("Marker latitude",this.latitude);
      console.log("Marker longitude",this.longitude);
    });
  }
  saveLocation() {
    this.myInstitution.latitude = this.latitude;
    this.myInstitution.longitude = this.longitude;
    this.institutionService.saveLocation(this.myInstitution).subscribe(
      response => {
        console.log("Location saved successfully.",this.myInstitution.latitude,this.myInstitution.longitude);
        this.toastr.success("Location saved successfully.");
      },
      error => {
        this.toastr.error("Error saving location.");
      }
    );
  }
  downloadExcel() {
    this.institutionService.downloadExcel().subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'file.xlsx'; // You can set your own file name here
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.log("error downloading");
        this.toastr.error("Error downloading Excel.");
      }
    )
  }
  countUsers(): void {
    this.institutionService.countUsers().subscribe(
      (response: InstitutionUsersCountDTO) => {
        this.usersCount = response;
        this.totalCount = this.usersCount.teachers! + this.usersCount.admins! + this.usersCount.students!;
        console.log("Admins count: ", this.usersCount.admins);
        console.log(response)
        console.log(this.usersCount)
      },
      (error: any) => {
        console.error('Error fetching institutions:', error);
      }
    );
  }

  getMyInstitution(): void {
    this.institutionService.getMyInstitution().subscribe(
      (response: InstitutionDTO) => {
        this.myInstitution = response;
        console.log("My institution: ", this.myInstitution);
        console.log("My institution latitude: ", this.myInstitution.latitude);
        console.log("My institution longitude: ", this.myInstitution.longitude);
        console.log("My institution second: ", this.myInstitution);
        this.setLocation();
      },
      (error: any) => {
        console.error('Error fetching institution information:', error);
      }
    );
  }

  toggleUsersTable(role: string) {
    this.showUsersTable = !this.showUsersTable;
    this.role = role;
  }

  handleUsersTableToggle(message: boolean) {
    this.showUsersTable = message;
  }
}
