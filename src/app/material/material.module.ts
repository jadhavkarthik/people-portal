import { NgModule } from '@angular/core';
import * as Material from '@angular/material';


const MaterialComponents = [
  Material.MatSidenavModule,
  Material.MatIconModule,
  Material.MatListModule,
  Material.MatToolbarModule,
  Material.MatRippleModule,
  Material.MatButtonModule,
  Material.MatFormFieldModule,
  Material.MatDialogModule,
  Material.MatInputModule,
  Material.MatSelectModule,
  Material.MatCheckboxModule,
  Material.MatProgressSpinnerModule,
  Material.MatSnackBarModule,
  Material.MatCardModule,
  Material.MatDatepickerModule,
  Material.MatNativeDateModule,
  Material.MatProgressBarModule,
  Material.MatChipsModule,
  Material.MatTableModule,
  Material.MatPaginatorModule,
  Material.MatDividerModule,
  Material.MatGridListModule,
  Material.MatRadioModule,
  Material.MatTooltipModule,
  Material.MatSlideToggleModule,
  Material.MatButtonToggleModule
];

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
