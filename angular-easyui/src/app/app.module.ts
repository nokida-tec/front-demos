import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EasyUIModule } from 'ng-easyui/components/easyui/easyui.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EasyUIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
