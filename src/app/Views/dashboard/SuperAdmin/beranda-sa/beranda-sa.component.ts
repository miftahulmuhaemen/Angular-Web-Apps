import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../../../services/register.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import decode from 'jwt-decode';

@Component({
  selector: 'app-beranda-sa',
  templateUrl: './beranda-sa.component.html',
  styleUrls: ['./beranda-sa.component.css']
})
export class BerandaSaComponent  {

  title = "app";

  pegawai: any[]
  lembaga: any[]
  pendidik: any[]
  kependidikan: any[]
  pesertadidik: any[]

  // General Option
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  // Pegawai
  yAxisLabel_Pegawai = "Pegawai";
  colorScheme = {
    domain: ["#34495e", "#8e44ad", "#C7B42C", "#AAAAAA"]
  };

  // lembaga
  yAxisLabel_Lembaga = "Lembaga";
  colorScheme_Lembaga = {
    domain: ["#e67e22", "#1abc9c", "#7f8c8d", "#7f8c8d"]
  };

  // Pendidik
  yAxisLabel_Pendidik = "Pendidik";
  colorScheme_Pendidik = {
    domain: ["#1abc9c", "#7f8c8d", "#C7B42C", "#AAAAAA"]
  };

  // Kependidikan
  yAxisLabel_Kependidikan = "Kependidikan";
  colorScheme_Kependidikan = {
    domain: ["#1abc9c", "#7f8c8d", "#7f8c8d", "#AAAAAA"]
  };

  // Peserta Didik
  yAxisLabel_Pesertadidik = "Peserta Didik";
  colorScheme_Pesertadidik = {
    domain: ["#1abc9c", "#7f8c8d", "#7f8c8d", "#AAAAAA"]
  };

  onSelect(event) {
    console.log(event);
  }

  constructor(public register : RegisterService,public _router : Router){

          const token = localStorage.getItem('token');
          const tokenPayload = decode(token);
          if(tokenPayload.role == 'Super Admin'){
            this.register.GET_CHART_SA()
            .subscribe(
                (data:chart) => {
                     this.Data_resume(data[0])
            }, error => {
              if(error instanceof HttpErrorResponse){
                if(error.status === 401)
                  this._router.navigate(['/super-admin/beranda'])
              } else {
                console.log(error)
              }
            });
          } else {
            this.register.GET_CHART_A({ id_dinas : tokenPayload.id_dinas })
            .subscribe(
                (data:chart) => {
                     this.Data_resume(data[0])
            }, error => {
              if(error instanceof HttpErrorResponse){
                if(error.status === 401)
                  this._router.navigate(['/super-admin/beranda'])
              } else {
                console.log(error)
              }
            });
          }


  }

  Data_resume(data: chart){

        this.pegawai = [
          {
              name : "Laki-Laki",
              value : data.Pegawai_L
          },
          {
              name : "Perempuan",
              value : data.Pegawai_P
          }
        ]

        this.lembaga = [
          {
              name : "PAUD",
              value : data.PAUD
          },
          {
              name : "LKP",
              value : data.LKP
          },
          {
              name : "PKBM",
              value : data.PKBM
          }
        ]

        this.pendidik = [
          {
              name : "Laki-Laki",
              value : data.Pendidik_L
          },
          {
              name : "Perempuan",
              value : data.Pendidik_P
          }
        ]

        this.kependidikan = [
          {
              name : "Laki-Laki",
              value : data.Kependidikan_L
          },
          {
              name : "Perempuan",
              value : data.Kependidikan_P
          }
        ]

        this.pesertadidik = [
          {
              name : "Laki-Laki",
              value : data.Pesertadidik_L
          },
          {
              name : "Perempuan",
              value : data.Pesertadidik_P
          }
        ]
  }


}


export interface chart {

  Pegawai_L : string,
  Pegawai_P : string,
  PAUD : string,
  LKP : string,
  PKBM : string,
  Pendidik_L : string,
  Pendidik_P : string,
  Kependidikan_L : string,
  Kependidikan_P : string,
  Pesertadidik_L : string,
  Pesertadidik_P : string,

}
