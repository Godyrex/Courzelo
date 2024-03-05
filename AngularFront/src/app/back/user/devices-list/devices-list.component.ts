import {Component, OnInit} from '@angular/core';
import {DeviceService} from "../../../service/user/profile/device.service";
import {DeviceListDTO} from "../../../model/user/DeviceListDTO";
import {DeviceDTO} from "../../../model/user/DeviceDTO";

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {
  deviceDTOS: DeviceDTO[] = []
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.loadDevices();

  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log("page changed from paginator" + page)
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDevices(this.currentPage, this.pageSize).subscribe(
      (response: DeviceListDTO) => {
        this.deviceDTOS = response.devices!;
        console.log("devices in page " + this.currentPage + " :" + response.devices)
        this.totalPages = response.totalPages!;
        console.log("total number of pages : " + response.totalPages)
      },
      (error: any) => {
        console.error('Error fetching devices:', error);
      }
    );
  }

  deleteDevice(id: string) {
    this.deviceService.deleteDevice(id).subscribe(
      data => {
        this.deviceDTOS = this.deviceDTOS.filter(dev => dev.id !== id);
      }, error => {
        console.log("delete Device error :", error)

      });

  }

}
