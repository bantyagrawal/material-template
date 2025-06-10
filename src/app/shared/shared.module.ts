import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatCardModule } from '@angular/material/card';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SelectComponent } from './components/select/select.component';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChartComponent } from './components/chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PageheaderComponent } from './components/pageheader/pageheader.component';
import { MatRadioModule } from '@angular/material/radio'; // <-- Add this import
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { MatExpansionModule } from '@angular/material/expansion';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TabComponent } from './components/tab/tab.component';
import { TabItemComponent } from './components/tab/tab-item.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { RouterModule } from '@angular/router';
import { ValidationDirective } from './directives/validation.directive';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [NotificationDialogComponent, InputComponent, ButtonComponent, HeaderComponent, FooterComponent, SidebarComponent, DatePickerComponent, TableComponent, SelectComponent , SearchBarComponent, CheckboxComponent, ChartComponent, PageheaderComponent, NotificationDialogComponent, TooltipComponent, TabComponent, TabItemComponent , ProfileCardComponent, ValidationDirective],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatBadgeModule,
    MatCardModule,
    MatSidenavModule,
    HttpClientModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    NgApexchartsModule,
    MatRadioModule,
    MtxGridModule,
    MatExpansionModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  exports: [InputComponent, ButtonComponent, HeaderComponent, FooterComponent, SidebarComponent, DatePickerComponent, TableComponent, SelectComponent , 
    SearchBarComponent, CheckboxComponent, ChartComponent, PageheaderComponent, NotificationDialogComponent, TooltipComponent, TabComponent, TabItemComponent , ProfileCardComponent]
})
export class SharedModule { }
