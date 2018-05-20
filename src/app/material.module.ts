import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import { MatButtonModule,MatDialogModule, MAT_DIALOG_DATA, MatPaginatorModule, MatSortModule,MatTableModule,MatCardModule,MatExpansionModule,MatCheckboxModule,MatSidenavModule, MatSnackBarModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatInputModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports : [CdkTableModule,MatDialogModule,MatButtonModule,MatPaginatorModule, MatSortModule ,MatTableModule,MatCardModule,MatExpansionModule,MatCheckboxModule,MatSidenavModule, MatSnackBarModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  exports : [CdkTableModule,MatDialogModule,MatButtonModule,MatPaginatorModule, MatSortModule,MatTableModule,MatCardModule,MatExpansionModule,MatCheckboxModule,MatSidenavModule, MatSnackBarModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
})

export class MaterialModule { }