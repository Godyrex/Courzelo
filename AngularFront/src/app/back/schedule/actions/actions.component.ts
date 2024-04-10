import {Component} from '@angular/core';
import Swal from "sweetalert2";
import {ActionsService} from "../../../service/schedule/actions.service";
import {ClassService} from "../../../service/program/class.service";
import {TimeTableService} from "../../../service/schedule/time-table.service";
import {Router} from "@angular/router";
import {UserListDTO} from "../../../model/user/UserListDTO";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {
  spinnerGenerate:boolean=false;
  spinnerImport:boolean=false;
  spinnerExport:boolean=false;
  importStatus:boolean=false;
  generateStatus:boolean=false;
  ready: boolean = false;

  constructor(private actionsService:ActionsService,private cl:ClassService,private el:TimeTableService , private router: Router) { }
  ngOnInit(): void {
    this.cl.getClassUsers('classID', 'Teacher', 0, 6).subscribe(
      (data: UserListDTO) => {
        console.log(data);
        if(data.userResponse && data.userResponse.length > 0){
          this.importStatus = true;
        }
        console.log(`Total pages: ${data.totalPages}`);
      }
    )
    this.el.getEmplois().subscribe(
      data=>{
        console.log(data);
        if(data.length>0){
          if(data[0].dayOfWeek!="" && data[0].dayOfWeek!=null && data[0].dayOfWeek)
            this.generateStatus=true;
        }
      }
    )
  }
  handleImport(event: any) {
    console.log("import");
    const file = event.target.files[0]; // Get the first file from the FileList
    if (file) {
      this.spinnerImport = true;
      this.importFile(file);
    }
  }
  importFile(file: File) {
    this.actionsService.importFile(file).subscribe(
      (data) => {
        this.spinnerImport = false;
        this.importStatus = true;

        // If done, show a success message
        Swal.fire('Imported !', 'File imported succefully.', 'success');
        this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => this.router.navigate(["/home"]));
        window.location.reload();
      },
      (error) => {
        this.spinnerImport = false;

        // If there is an error, show an error message
        Swal.fire('Error !', 'An error has occured during the importing.', 'error');
      }
    );
  }
  handleDownload() {
    this.actionsService.downloadGeneratedExcelFile().subscribe(
      (data: Blob) => {
        // Create a blob from the data
        const url = window.URL.createObjectURL(data);
        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'filename.xlsx'; // Use the filename you want
        // Append the link to the body
        document.body.appendChild(link);
        // Simulate click
        link.click();
        // Remove the link when done
        document.body.removeChild(link);
        // Show a success message
        Swal.fire('Downloaded!', 'File downloaded successfully.', 'success');
      },
      (error) => {
        console.error('Download error!', error);
        // Show an error message
        Swal.fire('Error!', 'An error occurred during the download.', 'error');
      }
    );
  }
  handleExport(){
    console.log("export")
    // ask if he really wants to import the file
    Swal.fire({
      title: 'Would u like to export data ?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, export !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.isConfirmed) {
          // if he confirms, then import the file
          // upload  file
          this.spinnerExport=true;

          this.actionsService.exportFile().subscribe(
            data=>{
              this.spinnerExport=false;
              console.log(data)
              // if done, then show a success message
              downloadFile(data, "application/pdf");
            },
            error=>{
              this.spinnerExport=false;
              console.log(error)
              // if done, then show a success message
              Swal.fire(
                'Error !',
                'An error has ocuured durring exporting.',
                'error'
              )
            }
          )
          // show a loading spinner
        }
      }
    )
  }
  handleGenerate(){
    // ask if he really wants to import the file
    Swal.fire({
      title: 'Would you like to generate timetable ?',
      text: "This operation may take some time",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, generate !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.isConfirmed) {
          // if he confirms, then import the file
          // upload  file
          this.spinnerGenerate=true;
          this.actionsService.generateEmploi().subscribe(
            data=>{
              this.generateStatus=true;
              this.spinnerGenerate=false;
              // if done, then show a success message
              Swal.fire(
                'Generated !',
                'TimeTables genereted succesfully.',
                'success'
              )
            }
          )
          // show a loading spinne
        }
      }
    )
  }
}
function downloadFile(data: Blob, arg1: string) {
  const blob = new Blob([data], { type: arg1 });
  const url = window.URL.createObjectURL(blob);
  window.open(url);
}
