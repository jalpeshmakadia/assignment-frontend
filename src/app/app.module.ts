import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './modules/product/product.component';
import { ProductCompareComponent } from './modules/product-compare/product-compare.component';
import { HomeComponent } from './modules/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ExistCompare } from './pipes/exist-compare.pipe';
import { LoaderComponent } from './modules/loader/loader.component';
import { LoaderService } from './services/loader.service';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductCompareComponent,
    HomeComponent,
    ExistCompare,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
