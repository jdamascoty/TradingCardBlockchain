import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { BlockchainComponent } from './blockchain/blockchain.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupDialogComponent } from './blockchain/popup-dialog/popup-dialog.component';
import { BlockchainCardComponent } from './blockchain/blockchain-card/blockchain-card.component';
import { ErrorPopupDialogComponent } from './blockchain/error-popup-dialog/error-popup-dialog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    BlockchainComponent,
    PopupDialogComponent,
    BlockchainCardComponent,
    ErrorPopupDialogComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    PopupDialogComponent,
    ErrorPopupDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
