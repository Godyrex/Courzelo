import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
public valeur !:any;
  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.valeur = this.route.snapshot.queryParamMap.get('valeur');
  }
 goHome()
 {
  this.router.navigate(['/home']);
  localStorage.setItem('pages', '0');
 }

}
