import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RollPageRoutingModule } from './roll-routing.module';

import { RollPage } from './roll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RollPageRoutingModule
  ],
  declarations: [RollPage]
})
export class RollPageModule {}
