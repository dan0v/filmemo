import { RollSummary } from './models/rollSummary';
import { StorageHandlerService } from './services/storage-handler.service';
import { Component } from '@angular/core';
import { Roll } from './models/roll';
import { AppConstant, StorageHandlerEventType } from './models/enums';
import { StorageHandlerEvent } from './models/storage-handler-event';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public filmRolls:RollSummary[] = [ ];
  
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private _router:Router, private _storage:StorageHandlerService) { 
    this._storage.getObservable().subscribe(event => this.handleEvent(event));
  }

  async ngOnInit() {
    await this._storage.init();
    await this.loadFilmRolls();
  }

  private async handleEvent(event:StorageHandlerEvent) {
    switch(event.eventType) {
      case StorageHandlerEventType.ROLLS_SUMMARY_UPDATED: {
        await this.loadFilmRolls();
      }
    }
  }

  private async loadFilmRolls() {
    this.filmRolls = await this._storage.getRollsSummaryList();
  }

  protected async resetDataStoreClicked(event:any) {
    await this._storage.clear();
    this._router.navigate(['/']);
  }
}
