import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import { MatButtonModule,MatChipsModule,MatDialogModule, MAT_DIALOG_DATA, MatPaginatorModule, MatSortModule,MatTableModule,MatCardModule,MatExpansionModule,MatCheckboxModule,MatSidenavModule, MatSnackBarModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatInputModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports : [CdkTableModule,MatChipsModule,MatDialogModule,MatButtonModule,MatPaginatorModule, MatSortModule ,MatTableModule,MatCardModule,MatExpansionModule,MatCheckboxModule,MatSidenavModule, MatSnackBarModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  exports : [CdkTableModule,MatChipsModule,MatDialogModule,MatButtonModule,MatPaginatorModule, MatSortModule,MatTableModule,MatCardModule,MatExpansionModule,MatCheckboxModule,MatSidenavModule, MatSnackBarModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
})

export class MaterialModule { }
