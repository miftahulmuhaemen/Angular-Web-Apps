import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule } from '@angular/material';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    showFiller = false;
    opened : boolean = true;
    state : boolean = true;


  constructor(private _auth : RegisterService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    if(tokenPayload.role != 'Super Admin')
      this.state = false;


  }

}
