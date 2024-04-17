import {Component} from '@angular/core';
import {Departement} from "../../../../model/schedule/departement";
import {FieldOfStudy} from "../../../../model/schedule/field-of-study";
import {Semester} from "../../../../model/schedule/semester";
import {ElementModule} from "../../../../model/schedule/element-module";
import {DepartmentService} from "../../../../service/schedule/department.service";
import {ElementModuleService} from "../../../../service/schedule/element-module.service";
import {TimeTableService} from "../../../../service/schedule/time-table.service";
import {ClassDTO} from "../../../../model/program/ClassDTO";
import {AuthenticationService} from "../../../../service/user/auth/authentication.service";
import {TokenStorageService} from "../../../../service/user/auth/token-storage.service";
import Swal from "sweetalert2";
import {ActionsService} from "../../../../service/schedule/actions.service";
import {ClassService} from "../../../../service/program/class.service";
import {FieldOfstudyService} from "../../../../service/schedule/field-ofstudy.service";
import {Class} from "../../../../model/schedule/Class";
import {SemesterService} from "../../../../service/schedule/semester.service";
import {ClassListDTO} from "../../../../model/program/ClassListDTO";
import jsPDF from 'jspdf';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent  {
  prof!: boolean;
  public departements:Departement[] = [];
  public ProfPage:Departement[] = [];
  public filieres:FieldOfStudy[] = [];
  public semsters:Semester[] = [];
  public classes: ClassDTO[] = [];
  public elementModule:ElementModule[] = [];
  selectedDepartement: Departement|undefined;
  selectedFiliere: FieldOfStudy|undefined;
  selectedSemster: Semester|undefined;
  classe!:ClassDTO;
  spinnerExport:boolean=false;
  ready = false;
  admin:boolean = false;
 constructor(
             private departmentService: DepartmentService,
             private tokenStorageService :TokenStorageService,
             private authenticationService: AuthenticationService,
             private TimeTableService: TimeTableService,
             private elementModuleService: ElementModuleService,
             private actionsService:ActionsService,
             private classService:ClassService,
             private fieldOfStudyService:FieldOfstudyService,
             private semesterService:SemesterService

 ){}


  ngOnInit() {
    this.departmentService.getAllDepartements().subscribe(data => { this.departements = data; });

    this.fieldOfStudyService.getAllFilieres().subscribe(data => {
      this.filieres = data;
    });
    this.semesterService.getAllSemesters().subscribe(data => {
      this.semsters = data;});
  /*  this.classService.getClasses().subscribe(data => {
      this.classes = data;
    });*/
    if (this.prof) {
      this.authenticationService.getRole().subscribe(role => {
        this.prof = role.includes('TEACHER');
        if (this.prof) {
          this.ready = true;
          let userResponse = this.tokenStorageService.getUserResponse();
          if (userResponse && userResponse.id) {
            this.TimeTableService.getEmploiByProf(userResponse.id).subscribe(
              data => {
                console.log(data);
                this.elementModule = data;
                console.log(data);
              }
            )
          }
        } else {

          this.admin = role.includes('ADMIN'); // Check if the user is an admin
        }
      });
    }
  }
  getDepartements() {
    this.departmentService.searchDepartments("")
      .subscribe(
        (data: Departement[]) => {
          this.departements = data;
        },
        (error) => {
          console.error('Error fetching departments:', error);
        }
      );
  }

  hasModule(days: string, period: string): boolean {

    let prd= this.getPeriod(period);
    let dayOfWeek  = this.changeDay(days).toUpperCase();

    return this.elementModule.some(modul => modul.dayOfWeek ===dayOfWeek  && modul.period === prd);
  }
  getPeriod(period: string): string {
    let prd = "";
    switch (period) {
      case "8h30-10h30":
        prd = "P1";
        break;
      case "10h30-12h30":
        prd = "P2";
        break;
      case "14h-16h":
        prd = "P3";
        break;
      case "16h-18h":
        prd = "P4";
        break;
      default:
        break;
    }
    return prd;
  }
  changeDay(dayOfWeek:string){
    let period = "";
    switch (dayOfWeek) {
      case "Monday":
        period = "Monday";
        break;
      case "Tuesday":
        period = "Tuesday";
        break;
      case "Wednesday":
        period = "Wednesday";
        break;
      case "Thursday":
        period = "Thursday";
        break;
      case "Friday":
        period = "Friday";
        break;
      default:
        break;
    }
    return period;
  }
 /* getModuleTitle(days: string, timeSlot: string): string {
    let dayOfWeek = this.changeDay(days).toUpperCase();
    let period= this.getPeriod(timeSlot );
    const modul = this.elementModule.find(modul => modul.dayOfWeek === dayOfWeek
      && modul.period === period);

    return modul ? modul.name : '';
  }
  getModuleTeacher(days: string, timeSlot: string): string {
    let dayOfWeek = this.changeDay(days).toUpperCase();
    let period= this.getPeriod(timeSlot );
    const modul = this.elementModule.find(modul => modul.dayOfWeek === dayOfWeek
      && modul.period === period);
    if(!this.prof)
    {
      return modul ? modul.teacher.profile?.name+" "+modul.teacher.profile?.lastName : '';

    }else{
      return modul && modul.modul && modul.modul.aClass && modul.modul.aClass.name ? modul.modul.aClass.name : '';
    }
  }*/
  getModuleTitle(day: string, time: string): string {
    const module = this.elementModule.find(m => m.dayOfWeek === day && m.period === time);
    console.log('Module for ' + day + ' at ' + time + ':', module);
    return module ? module.name : '';
  }

  getModuleTeacher(day: string, time: string): string {
    const module = this.elementModule.find(m => m.dayOfWeek === day && m.period === time);
    console.log('Teacher for ' + day + ' at ' + time + ':', module && module.teacher);
    return module && module.teacher ? `${module.teacher.profile?.name} ${module.teacher.profile?.lastName}` : '';
  }
  handleDownloadEmploi() {
    Swal.fire({
      title: 'Would you like to export data ?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, export !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinnerExport = true;
        if (this.prof) {
          let userResponse = this.tokenStorageService.getUserResponse();
          if (userResponse && userResponse.id) {
            this.actionsService.exportFileProf(userResponse.id).subscribe(
              (data: Blob) => {
                this.spinnerExport = false;
                console.log(data);
                // if done, then show a success message
                const url = window.URL.createObjectURL(data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf');
                document.body.appendChild(link);
                link.click();
              },
              error => {
                this.spinnerExport = false;
                console.log(error)
                // if done, then show a success message
                Swal.fire(
                  'Error !',
                  'An arror has ocurred during exporting.',
                  'error'
                )
              }
            )
          }
        } else {
          this.actionsService.exportFileClasse(this.selectedFiliere!.id).subscribe(
            data => {
              this.spinnerExport = false;
              console.log(data)
              // if done, then show a success message
              downloadFile(data, "application/pdf");
            },
            error => {
              this.spinnerExport = false;
              console.log(error)
              // if done, then show a success message
              Swal.fire(
                'Error !',
                'An arror has ocurred during exporting..',
                'error'
              )
            }
          )
        }
        // show a loading spinner
      }
    });
  }


 /* handleDepartmentChange(target: EventTarget | null) {
    if (target instanceof HTMLSelectElement) {
      const departmentId = (target.value);
      console.log("Selected department ID:", departmentId); // Debugging line
      this.selectedDepartement = this.departements.find(
        (department) => department.id === departmentId
      );
      console.log("Selected department:", this.selectedDepartement); // Debugging line
      // Call the getFilieres method to update the filieres based on the selected department
      this.getFilieres();
    }
  }
  handleFiliereChange(target: EventTarget | null) {
    if (target instanceof HTMLSelectElement) {
      const fieldId = (target.value);
      this.selectedFiliere = this.filieres.find(
        (f) => f.id === fieldId
      );
      // Call the getFilieres method to update the filieres based on the selected department
      this.getSemsters();
    }
  }
  handleSemsterChange(target: EventTarget | null) {
    if (target instanceof HTMLSelectElement) {
      const semsterId = (target.value);
      this.selectedSemster = this.semsters.find(
        (s) => s.id === semsterId
      );
      this.ready = true;
      this.getEmplois(semsterId, this.selectedFiliere!.id, this.selectedDepartement!.id);
    }
  }*/

  fetchElementModules(): void {
    this.elementModuleService.getAllElementModules()
      .subscribe(
        elements => {
          this.elementModule = elements;
          console.log('elementModule:', this.elementModule); // Log the elementModule array to the console
        },
        error => {
          console.error('Error fetching element modules:', error); // Log any errors that occur while fetching the data
        }
      );
  }
  handleSemsterChange(target: EventTarget | null) {
    if (target instanceof HTMLSelectElement) {
      const semsterId = (target.value);
      this.selectedSemster = this.semsters.find(
        (s) => s.id === semsterId
      );
      this.ready = true;
      this.getEmplois(semsterId, this.selectedFiliere!.id, this.selectedDepartement!.id);
      this.generatePDF();
      this.fetchElementModules(); // Fetch the element modules
    }
  }

  handleFiliereChange(target: EventTarget | null) {
    if (target instanceof HTMLSelectElement) {
      const fieldId = (target.value);
      this.selectedFiliere = this.filieres.find(
        (f) => f.id === fieldId
      );
      this.getSemsters();
      this.fetchElementModules(); // Fetch the element modules
    }
  }

  handleDepartmentChange(target: EventTarget | null) {
    if (target instanceof HTMLSelectElement) {
      const departmentId = (target.value);
      this.selectedDepartement = this.departements.find(
        (department) => department.id === departmentId
      );
      this.getFilieres();
      this.fetchElementModules(); // Fetch the element modules
    }
  }
  generatePDF(): void {
    const doc = new jsPDF();

    let content = 'Timetable:\n\n';
    this.elementModule.forEach((module, index) => {
      content += `Module ${index + 1}:\n`;
      content += `Name: ${module.name}\n`;
      content += `Number of Hours: ${module.nmbrHours}\n`;
      content += `Day of Week: ${module.dayOfWeek}\n`;
      content += `Period: ${module.period}\n`;
      content += `Number of Semesters: ${module.numSemesters}\n`;
      content += `Number of Departments: ${module.numDepartments}\n`;
      content += `Teacher: ${module.teacher.profile?.name} ${module.teacher.profile?.lastName}\n`;
      content += `Module: ${module.modul.name}\n\n`;
    });

    doc.text(content, 10, 10);
    doc.save('timetable.pdf');
  }

  getEmplois(semsterId: string, idFiliere: string | undefined, idDepartement: string) {
    this.classService.searchClassesSem(this.selectedFiliere!.name, semsterId, 0).subscribe(
      (data: ClassDTO[]) => {
        if (data && data.length > 0) {
          this.classe = data[0];
          let classeId = this.classe.id;
          this.TimeTableService.getEmploisByClasse(classeId).subscribe(
            data => {
              this.elementModule = data;
              console.log(data);
            }
          )
        }
      }
    );
  }
  getFilieres(){
    if(this.selectedDepartement)
      this.departmentService.getFilieres(this.selectedDepartement.id).subscribe(
        (data) => {
          this.filieres = data;
        }
      );
  }
  getSemsters(){
    if(this.selectedFiliere)
      this.fieldOfStudyService.getSemsterByField(this.selectedFiliere.id).subscribe(
        (data) => {
          this.semsters = data;
        }
      );
  }
}
function downloadFile(data: Blob, arg1: string) {
  const blob = new Blob([data], { type: arg1 });
  const url = window.URL.createObjectURL(blob);
  window.open(url);


}
