import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSnackBar } from '@angular/material'
import { filter } from 'rxjs/operators'
import { RegisterService } from './register.service'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

//Export to Excel Library
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ImportXlsxService {

  private Status = new BehaviorSubject<number>(0)
  status = this.Status.asObservable()

  private Pegawai = new BehaviorSubject<any>(null)
  currentPegawai = this.Pegawai.asObservable()

  private PamongPenilik = new BehaviorSubject<any>(null)
  currentPamongPenilik = this.PamongPenilik.asObservable()

  private PotensiDaerah = new BehaviorSubject<any>(null)
  currentPotensiDaerah = this.PotensiDaerah.asObservable()

  private LembagaPAUD = new BehaviorSubject<any>(null)
  currentLembagaPAUD = this.LembagaPAUD.asObservable()

  private LembagaLKP = new BehaviorSubject<any>(null)
  currentLembagaLKP = this.LembagaLKP.asObservable()

  private LembagaPKBM = new BehaviorSubject<any>(null)
  currentLembagaPKBM = this.LembagaPKBM.asObservable()

  private Pendidik = new BehaviorSubject<any>(null)
  currentPendidik = this.Pendidik.asObservable()

  private Kependidikan = new BehaviorSubject<any>(null)
  currentKependidikan = this.Kependidikan.asObservable()

  private Pesertadidik = new BehaviorSubject<any>(null)
  currentPesertadidik = this.Pesertadidik.asObservable()

  progress_check : boolean = true
  stock_id_dinas : number
  identified_jenis : string;

  stock_program_lkp = []

  constructor(public snackbar : MatSnackBar, public register : RegisterService) {
      this.register.GET_PROGRAM_LKP().subscribe(
          (data:any[]) => { for(let value of data)  this.stock_program_lkp.push(value.nama_program) },
           error => { this.snackbar.open("Internal Query Program LKP goes into wrong way!", 'close') });
  }

  onPesertadidikStream(){
    return this.currentPesertadidik.pipe(filter((files:any) => {

          if(files == null) return false

          for(let data of files){
              if(this.min16_max18Character(data.id_kependidikan) &&
                 this.kelaminCheck(data.jenis_kelamin) &&
                 this.tanggalCheck(data.tanggal_lahir) &&
                 this.min8Character(data.id_lembaga) &&
                 this.kesetaraanCheck(data.kesetaraan) &&
                 this.keaksaraanCheck(data.status_keaksaraan)
                 // perlu cek lembaga yang boleh dimasukkan disini.
                 )
               this.progress_check = true
              else
               this.progress_check = false
          }
              return this.progress_check

            })).subscribe((files : any) => {

                this.register.Transaction().subscribe(
                  res => {}, err => {
                    if(err instanceof HttpErrorResponse)
                      if(err.status !== 200)
                            this.snackbar.open("Internal SQL drunked", 'close', { duration : 2000})
                  })
                for(let data of files){
                      let Dream =  this.register.ADD_PESERTADIDIK(data).subscribe(
                             res => {},  err => {
                                if(err instanceof HttpErrorResponse){
                                  if(err.status !== 200){
                                        this.snackbar.open("Something wrong happen!", 'close', { duration : 2000})
                                        this.register.Rollback().subscribe()}
                                  else
                                    this.Status.next(8)
                              }})}
                            })
  }
  onKependidikanStream(){
    return this.currentKependidikan.pipe(filter((files:any) => {

          if(files == null) return false

          for(let data of files){
              if(this.min16_max18Character(data.id_kependidikan) &&
                 this.kelaminCheck(data.jenis_kelamin) &&
                 this.tanggalCheck(data.tanggal_lahir) &&
                 this.min8Character(data.id_lembaga) &&
                 this.pendidikanCheck(data.pendidikan_terakhir) &&
                 this.pangkatGolonganCheck(data.pangkat_golongan) &&
                 this.yearCheck(data.tahun_lulus)
                 // perlu cek lembaga yang boleh dimasukkan disini.
                 )
               this.progress_check = true
              else
               this.progress_check = false
          }
              return this.progress_check

            })).subscribe((files : any) => {

                this.register.Transaction().subscribe(
                  res => {}, err => {
                    if(err instanceof HttpErrorResponse)
                      if(err.status !== 200)
                            this.snackbar.open("Internal SQL drunked", 'close', { duration : 2000})
                  })
                for(let data of files){
                      let Dream =  this.register.ADD_KEPENDIDIKAN(data).subscribe(
                             res => {},  err => {
                                if(err instanceof HttpErrorResponse){
                                  if(err.status !== 200){
                                        this.snackbar.open("Something wrong happen!", 'close', { duration : 2000})
                                        this.register.Rollback().subscribe()}
                                  else
                                    this.Status.next(8)
                              }})}
                            })
  }
  onPendidikStream(){
    return this.currentPendidik.pipe(filter((files:any) => {

          if(files == null) return false

          for(let data of files){
              if(this.min16_max18Character(data.id_pendidik) &&
                 this.kelaminCheck(data.jenis_kelamin) &&
                 this.tanggalCheck(data.tanggal_lahir) &&
                 this.min8Character(data.id_lembaga) &&
                 this.statuspendidikCheck(data.status_pendidik) &&
                 this.sertifikatpelatihanCheck(data.sertifikat_pelatihan) &&
                 this.statusdiklatCheck(data.status_diklat)
                 // this.
                 // perlu cek lembaga yang boleh dimasukkan disini.
                 // perlu cek Tutor untuk LKP saja.
                 )
               this.progress_check = true
              else
               this.progress_check = false
          }
              return this.progress_check

            })).subscribe((files : any) => {

                this.register.Transaction().subscribe(
                  res => {}, err => {
                    if(err instanceof HttpErrorResponse)
                      if(err.status !== 200)
                            this.snackbar.open("Internal SQL drunked", 'close', { duration : 2000})
                  })
                for(let data of files){
                      data.nip = data.id_pendidik
                      let Dream =  this.register.ADD_PENDIDIK(data).subscribe(
                             res => {},  err => {
                                if(err instanceof HttpErrorResponse){
                                  if(err.status !== 200){
                                        this.snackbar.open("Something wrong happen!", 'close', { duration : 2000})
                                        this.register.Rollback().subscribe()}
                                  else
                                    this.Status.next(7)
                              }})}
                            })
  }
  onLembagaPKBMStream(){
    return this.currentLembagaPKBM.pipe(filter((files:any) => {

          if(files == null) return false

          for(let data of files){
              if(this.akreditasiCheck(data.akreditasi) &&
                 this.min5Character(data.kode_pos) &&
                 this.yearCheck(data.tahun_berdiri) &&
                 this.min4Character(data.tahun_berdiri) &&
                 this.phoneCheck(data.no_telp) &&
                 this.kondisibangunanCheck(data.kondisi_bangunan) &&
                 this.kepemilikanCheck(data.kepemilikan) &&
                 this.min8Character(data.id_lembaga))
               this.progress_check = true
              else
               this.progress_check = false
          }
              return this.progress_check

            })).subscribe((files : any) => {
                this.register.Transaction().subscribe(
                  res => {}, err => {
                    if(err instanceof HttpErrorResponse)
                      if(err.status !== 200)
                            this.snackbar.open("Internal SQL drunked", 'close', { duration : 2000})
                  })
                for(let data of files){

                      data.id_dinas = this.stock_id_dinas
                      data.jenis_lembaga = "PKBM"

                      let Dream =  this.register.ADD_LEMBAGA(data).subscribe(
                             res => {},  err => {
                                if(err instanceof HttpErrorResponse){
                                  if(err.status !== 200){
                                        this.snackbar.open("Something wrong happen!", 'close', { duration : 2000})
                                        this.register.Rollback().subscribe()}
                                  else
                                    this.Status.next(6)
                              }})}
                            })
  }
  onLembagaLKPStream(){
    return this.currentLembagaLKP.pipe(filter((files:any) => {

          if(files == null) return false

          for(let data of files){
              if(this.namaProgramLKPCheck(data.nama_program) &&
                 this.akreditasiCheck(data.akreditasi) &&
                 this.min5Character(data.kode_pos) &&
                 this.yearCheck(data.tahun_berdiri) &&
                 this.min4Character(data.tahun_berdiri) &&
                 this.phoneCheck(data.no_telp) &&
                 this.kondisibangunanCheck(data.kondisi_bangunan) &&
                 this.kepemilikanCheck(data.kepemilikan) &&
                 this.min8Character(data.id_lembaga))
               this.progress_check = true
              else
               this.progress_check = false
          }
              return this.progress_check

            })).subscribe((files : any) => {
                this.register.Transaction().subscribe(
                  res => {}, err => {
                    if(err instanceof HttpErrorResponse)
                      if(err.status !== 200)
                            this.snackbar.open("Internal SQL drunked", 'close', { duration : 2000})
                  })
                for(let data of files){

                      data.id_dinas = this.stock_id_dinas
                      data.jenis_lembaga = "LKP"

                      let Dream =  this.register.ADD_LEMBAGA(data).subscribe(
                             res => {},  err => {
                                if(err instanceof HttpErrorResponse){
                                  if(err.status !== 200){
                                        this.snackbar.open("Something wrong happen!", 'close', { duration : 2000})
                                        this.register.Rollback().subscribe()}
                                  else
                                    this.Status.next(5)
                              }})}
                            })
  }
  onLembagaPAUDStream(){
    return this.currentLembagaPAUD.pipe(filter((files:any) => {

          if(files == null) return false

          for(let data of files){
              if(this.namaProgramPAUDCheck(data.nama_program) &&
                 this.kurikulumCheck(data.kurikulum) &&
                 this.akreditasiCheck(data.akreditasi) &&
                 this.yearCheck(data.tahun_berdiri) &&
                 this.min4Character(data.tahun_berdiri) &&
                 this.phoneCheck(data.no_telp) &&
                 this.kondisibangunanCheck(data.kondisi_bangunan) &&
                 this.kepemilikanCheck(data.kepemilikan) &&
                 this.min8Character(data.id_lembaga))
               this.progress_check = true
              else
               this.progress_check = false
          }
              return this.progress_check

            })).subscribe((files : any) => {

                this.register.Transaction().subscribe(
                  res => {}, err => {
                    if(err instanceof HttpErrorResponse)
                      if(err.status !== 200)
                            this.snackbar.open("Internal SQL drunked", 'close', { duration : 2000})
                  })
                for(let data of files){

                      data.id_dinas = this.stock_id_dinas
                      data.jenis_lembaga = "PAUD"

                      let Dream =  this.register.ADD_LEMBAGA(data).subscribe(
                             res => {},  err => {
                                if(err instanceof HttpErrorResponse){
                                  if(err.status !== 200){
                                        this.snackbar.open("Something wrong happen!", 'close', { duration : 2000})
                                        this.register.Rollback().subscribe()}
                                  else
                                    this.Status.next(4)
                              }})}})
  }
  onPotensiDaerahStream(){
    return this.currentPotensiDaerah.pipe(filter((files:any) => {

          if(files == null) return false

          for(let data of files){
              if(this.jenispotensiCheck(data.jenis_potensi))
               this.progress_check = true
              else
               this.progress_check = false
          }
              return this.progress_check

            })).subscribe((files : any) => {

                this.register.Transaction().subscribe(
                  res => {}, err => {
                    if(err instanceof HttpErrorResponse)
                      if(err.status !== 200)
                            this.snackbar.open("Internal SQL drunked", 'close', { duration : 2000})
                  })
                for(let data of files){
                      data.id_dinas = this.stock_id_dinas
                      let Dream =  this.register.ADD_POTENSI(data).subscribe(
                             res => {},  err => {
                                if(err instanceof HttpErrorResponse){
                                  if(err.status !== 200){
                                        this.snackbar.open("Something wrong happen!", 'close', { duration : 2000})
                                        this.register.Rollback().subscribe()}
                                  else
                                    this.Status.next(3)
                              }})}})
  }
  onPamongPenilikStream(){
    return this.currentPamongPenilik.pipe(filter((files:any) => {

          if(files == null) return false

          for(let data of files){
              if(this.pangkatGolonganCheck(data.pangkat_golongan) &&
                 this.phoneCheck(data.no_hp) &&
                 this.tanggalCheck(data.tanggal_lahir) &&
                 this.kelaminCheck(data.jenis_kelamin) &&
                 this.min16_max18Character(data.nip) &&
                 this.jabatanCheck(data.jabatan))
               this.progress_check = true
              else
               this.progress_check = false
          }
              return this.progress_check

            })).subscribe((files : any) => {

                this.register.Transaction().subscribe(
                  res => {}, err => {
                    if(err instanceof HttpErrorResponse)
                      if(err.status !== 200)
                            this.snackbar.open("Internal SQL drunked", 'close', { duration : 2000})
                  })
                for(let data of files){
                      data.id_dinas = this.stock_id_dinas
                      let Dream =  this.register.ADD_PEGAWAI(data).subscribe(
                             res => {},  err => {
                                if(err instanceof HttpErrorResponse){
                                  if(err.status !== 200){
                                        this.snackbar.open("Something wrong happen!", 'close', { duration : 2000})
                                        this.register.Rollback().subscribe()}
                                  else
                                    this.Status.next(2)
                              }})}})
  }
  onPegawaiStream(){
    return this.currentPegawai.pipe(filter((files:any) => {

          if(files == null) return false

          for(let data of files){
              if(this.pangkatGolonganCheck(data.pangkat_golongan) &&
                 this.phoneCheck(data.no_hp) &&
                 this.tanggalCheck(data.tanggal_lahir) &&
                 this.kelaminCheck(data.jenis_kelamin) &&
                 this.min16_max18Character(data.nip))
               this.progress_check = true
              else
               this.progress_check = false
          }
              return this.progress_check

            })).subscribe((files : any) => {

                this.register.Transaction().subscribe(
                  res => {}, err => {
                    if(err instanceof HttpErrorResponse)
                      if(err.status !== 200)
                            this.snackbar.open("Internal SQL drunked", 'close', { duration : 2000})
                  })
                for(let data of files){
                      data.id_dinas = this.stock_id_dinas
                      let Dream =  this.register.ADD_PEGAWAI(data).subscribe(
                             res => {},  err => {
                                if(err instanceof HttpErrorResponse){
                                  if(err.status !== 200){
                                        this.snackbar.open("Something wrong happen!", 'close', { duration : 2000})
                                        this.register.Rollback().subscribe()}
                                  else
                                    this.Status.next(1)
                              }})}})
  }


  returnJson(evt: any, name: string){
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      switch(name){
        case 'Pegawai' :
              this.Pegawai.next(XLSX.utils.sheet_to_json(ws,{header:0}))
              break;
        case 'PamongPenilik' :
              this.PamongPenilik.next(XLSX.utils.sheet_to_json(ws,{header:0}))
              break;
        case 'PotensiDaerah' :
              this.PotensiDaerah.next(XLSX.utils.sheet_to_json(ws,{header:0}))
              break;
        case 'lembagaPAUD' :
              this.LembagaPAUD.next(XLSX.utils.sheet_to_json(ws,{header:0}))
              break;
        case 'lembagaLKP' :
              this.LembagaLKP.next(XLSX.utils.sheet_to_json(ws,{header:0}))
              break;
        case 'lembagaPKBM' :
              this.LembagaPKBM.next(XLSX.utils.sheet_to_json(ws,{header:0}))
              break;
        case 'pendidik' :
              this.Pendidik.next(XLSX.utils.sheet_to_json(ws,{header:0}))
              break;
        case 'kependidikan' :
              this.Kependidikan.next(XLSX.utils.sheet_to_json(ws,{header:0}))
              break;
        case 'pesertadidik' :
              this.Pendidik.next(XLSX.utils.sheet_to_json(ws,{header:0}))
              break;
      }

     };
     reader.readAsBinaryString(target.files[0]);
  }

  DataStream(excel_file: any, id_dinas:number, name:string){
      this.returnJson(excel_file,name)
      this.stock_id_dinas = id_dinas
  }

  snackbarInvalidMessage(str : string){
    this.snackbar.open(str + ", this cell is not Valid.", 'Close', {duration: 10000})
  }

  yearCheck(text: string){
      let year = new RegExp('[^0-9]')
      if(!year.test(text) == false)
        this.snackbarInvalidMessage(text)
      return !year.test(text)
  }

  phoneCheck(text: string){
      let HypenNumber = new RegExp('[^0-9|-]')
      if(!HypenNumber.test(text) == false)
        this.snackbarInvalidMessage(text)
      return !HypenNumber.test(text)
  }

  min16_max18Character(text: string){
    
    if(text.length == undefined){
        this.snackbarInvalidMessage(text)
        return false
      }

    if(text.length < 16 || text.length > 18){
        this.snackbarInvalidMessage(text)
        return false
      }
    return true
  }

  min8Character(text: string){
      if(text.length != 8){
          this.snackbarInvalidMessage(text)
          return false
        }
      return true
  }

  min4Character(text: string){
      if(text.length != 4){
          this.snackbarInvalidMessage(text)
          return false
        }
      return true
  }

  min5Character(text: string){
      if(text.length != 5){
          this.snackbarInvalidMessage(text)
          return false
        }
      return true
  }

  kelaminCheck(text: string){
    if((["Laki-Laki","Perempuan"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
      return true
  }

  jabatanCheck(text: string){
    if((["Pamong","Penilik"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
      return true
  }

  jenispotensiCheck(text: string){
    if((["Sumber Daya Alam","Wisata"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
    return true
  }

  namaProgramPAUDCheck(text: string){
    if((["TK","KB","SPS","TPA"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
    return true
  }

  namaProgramLKPCheck(text: string){

    if(text == undefined){
      this.snackbarInvalidMessage("Tidak ditemukan")
      return false}

    var corresspond_data = text.split(",")
        corresspond_data.pop()

    if(corresspond_data.length == 0){
      this.snackbarInvalidMessage("Kosong (Koma)")
      return false
    }

    for(let value of corresspond_data)
      if(this.stock_program_lkp.includes(value) == false)
        return false

    return true
  }

  kurikulumCheck(text: string){
    if((["K13","KTSP"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }

    return true
  }

  sertifikatpelatihanCheck(text: string){
    if((["Ada","Tidak Ada"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
    return true
  }

  kesetaraanCheck(text: string){
    if((["Paket A","Paket B","Paket C"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
    return true
  }

  keaksaraanCheck(text: string){
    if((["Buta Aksara","Tidak"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
    return true
  }

  statusdiklatCheck(text: string){
    if((["Diklat Dasar","Diklat Mahir","Diklat Lanjutan","Belum Diklat"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
    return true
  }


  statuspendidikCheck(text: string){

    if((["Guru","Guru Pendamping","Guru Pengasuh","Tutor"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }

      // if((["Tutor"]).includes(text) == true)
      //       if((["LKP"]).includes(this.identified_jenis) == false)
      //             return false

      // SpecialFunction_Pendidik(id: number){
      //   this.register.PENDIDIK_GET_JENIS({ id_lembaga : id }).subscribe(
      //       (data:any) => { for(let value of data)
      //           this.identified_jenis = value.jenis_lembaga; console.log("First")
      //       },
      //        error => { this.snackbar.open("!!!!", 'close') });
      // }
    return true

  }

  akreditasiCheck(text: string){
    if((["A","B","C","Belum Terakreditasi"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
    return true
  }

  pendidikanCheck(text: string){
    if((["SD","SMP","SMA","D1","D2","D3","D4","S1","S2","S3"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
    return true
  }

  pangkatGolonganCheck(text: string){
    if((["Juru Muda-I/a","Juru Muda TK I-I/b","Juru-I/c","Juru TK I-I/d","Pengatur Muda-II/a","Pengatur Muda TK I-II/b","Pengatur-II/c"
          ,"Pengatur TK I-II/d","Penata Muda-III/a","Penata Muda TK I-III/b","Penata-III/c","Penata TK I-III/d","Penata TK I-III/d"
          ,"Pembina-IV/a","Pembina TK I-IV/b","Pembina Utama Muda-IV/c","Pembina Utama Madya-IV/d","Pembina Utama-IV/e","Belum Berpangkat"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
      return true
  }

  kondisibangunanCheck(text: string){
    if((["Baik","Rusak Ringan","Rusak Sedang","Rusak Berat"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
      return true
  }

  kepemilikanCheck(text: string){
    if((["Milik Sendiri","Pinjam"]).includes(text) == false){
          this.snackbarInvalidMessage(text)
          return false
    }
      return true
  }

  tanggalCheck(text:string){

      var regEx = /^\d{4}-\d{2}-\d{2}$/
      if(!text.match(regEx)){
          this.snackbarInvalidMessage(text)
          return false
        }

      var d = new Date(text)
      if(!d.getTime() && d.getTime() !== 0){
          this.snackbarInvalidMessage(text)
          return false
        }

    if((d.toISOString().slice(0,10) === text) == false){
        this.snackbarInvalidMessage(text)
        return false
      }
    return true
  }


}


/* a note, better understanding at RxJS observable */


        // this.register.Transaction().subscribe(
        //   res => {
        //           console.log("RESPOND")
        //
        //         for(let data of files){
        //             console.log(data)
        //               let Dream =  this.register.ADD_PEGAWAI(data).subscribe(
        //                      res => { },
        //                      err => {
        //                       if(err instanceof HttpErrorResponse){
        //                         if(err.status !== 200)
        //                           validity = false;
        //                         }},
        //                       () => { console.log("LOG")})
        //           }
        //
        //   },
        //   err => {
        //             if(err.status !== 200){
        //
        //                 console.log("bukan 200")
        //
        //             } else {
        //                console.log("200 rupiah")
        //             }
        //
        //          },
        //   () => {
        //             console.log("Sukses mandek")
        //          })
