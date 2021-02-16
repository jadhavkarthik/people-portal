import { TokenInterceptor } from './token-auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent, DialogLoaderComponent } from './components/shell/toolbar/toolbar.component';
import { SideNavComponent } from './components/shell/side-nav/side-nav.component';
import { UserComponent } from './components/user/user.component';
import { CreateAdminComponent } from './dialogs/create-admin/create-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ChartsModule } from 'ng2-charts';
import { SuccessComponent } from './dialogs/success/success.component';
import { ErrorComponent } from './dialogs/error/error.component';
import { LoaderComponent } from './dialogs/loader/loader.component';
import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component';
import { TaskComponent } from './components/task/task.component';
import { CovalentFileModule } from '@covalent/core/file';
import { NgxFilesizeModule } from 'ngx-filesize';
import { DatePipe } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddRoomComponent } from './dialogs/add-room/add-room.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SideNavComponent,
    UserComponent,
    CreateAdminComponent,
    LoginComponent,
    DialogLoaderComponent,
    SuccessComponent,
    ErrorComponent,
    LoaderComponent,
    ConfirmationComponent,
    TaskComponent,
    AddRoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    CovalentFileModule,
    NgxFilesizeModule,
    NgxMatSelectSearchModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    CreateAdminComponent,
    DialogLoaderComponent,
    SuccessComponent,
    ErrorComponent,
    LoaderComponent,
    ConfirmationComponent,
    AddRoomComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
