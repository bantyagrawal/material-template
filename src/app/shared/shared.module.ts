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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [InputComponent, ButtonComponent, HeaderComponent, FooterComponent, SidebarComponent, DatePickerComponent, TableComponent, SelectComponent , SearchBarComponent, CheckboxComponent, ChartComponent, PageheaderComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  exports: [InputComponent, ButtonComponent, HeaderComponent, FooterComponent, SidebarComponent, DatePickerComponent, TableComponent, SelectComponent , SearchBarComponent, CheckboxComponent, ChartComponent, PageheaderComponent]
})
export class SharedModule { }
