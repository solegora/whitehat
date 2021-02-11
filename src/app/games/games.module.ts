import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, GamesRoutingModule],
  declarations: [GamesComponent],
  exports: [GamesComponent],
})
export class GamesModule { }
