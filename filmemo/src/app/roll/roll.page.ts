import { RollSummary } from './../models/rollSummary';
import { StorageHandlerService } from './../services/storage-handler.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppConstant, FilmType } from '../models/enums';
import { Roll } from '../models/roll';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-roll',
  templateUrl: './roll.page.html',
  styleUrls: ['./roll.page.scss'],
})
export class RollPage implements OnInit {

  constructor(private _router:Router, private _activatedRoute:ActivatedRoute, private _storage:StorageHandlerService) { 
    this.roll = new Roll(_storage);
  }

  protected roll:Roll;
  private pageId:string|null = "";
  protected filmTypeOptions:FilmType[] = RollPage.listFilmTypeOptions();

  // Viewmodel
  protected filmBrandText:string = "";
  protected cameraText:string = "";
  protected lensText:string = "";
  protected expiryDateText:string = "";

  async ngOnInit() {
    this._activatedRoute.paramMap.subscribe(async paramMap => {
      if (!paramMap.has(AppConstant.ID_PARAM)) {
        this._router.navigate(['/']);
      }
      this.pageId = paramMap.get(AppConstant.ID_PARAM);
      if (this.pageId != null) {
        if (this.pageId == AppConstant.NEW_ROLL_ID) {
          await this.saveRollToSummary();
          await this.saveRoll(true);
          this._router.navigate(['/roll', this.roll.id], { replaceUrl: true });
        }
        else {
          let roll:Roll|null = await this._storage.getRoll(this.pageId);
          if (roll == null) {
            this._router.navigateByUrl('');
          } else {
            this.roll = roll;
          }

          this.filmBrandText = this.roll.filmBrand;
          this.cameraText = this.roll.camera;
          this.lensText = this.roll.lens;
        }
      }
    });
  }

  protected async filmBrandChanged(event:any):Promise<void> {
    if (this.filmBrandText != event.detail.value) {
      this.filmBrandText = event.detail.value;
    }
  }

  protected async filmBrandCommitted(event:any):Promise<void> {
    if (this.roll.filmBrand != this.filmBrandText) {
      this.roll.filmBrand = this.filmBrandText;
      await this.saveRoll();
    }
  }

  protected async cameraChanged(event:any):Promise<void> {
    if (this.cameraText != event.detail.value) {
      this.cameraText = event.detail.value;
    }
  }

  protected async cameraCommitted(event:any):Promise<void> {
    if (this.roll.camera != this.cameraText) {
      this.roll.camera = this.cameraText;
      await this.saveRoll();
    }
  }

  protected async lensChanged(event:any):Promise<void> {
    if (this.lensText != event.detail.value) {
      this.lensText = event.detail.value;
    }
  }

  protected async lensCommitted(event:any):Promise<void> {
    if (this.roll.lens != this.lensText) {
      this.roll.lens = this.lensText;
      await this.saveRoll();
    }
  }

  protected async expectedShotCountCommitted(event:any):Promise<void> {
    if (this.roll.expectedShotCount != parseInt(event.detail.value)) {
      this.roll.expectedShotCount = parseInt(event.detail.value);
      await this.saveRoll();
    }
  }

  protected async expiryYearCommitted(event:any):Promise<void> {
    if (this.roll.expiryYear != parseInt(event.detail.value)) {
      this.roll.expiryYear = parseInt(event.detail.value);
      await this.saveRoll();
    }
  }

  protected async filmTypeCommitted(event:any):Promise<void> {
    if (this.roll.filmType != event.detail.value) {
      this.roll.filmType = event.detail.value;
      await this.saveRoll();
    }
  }

  protected log(event:any) {
    console.log(event);
  }

  protected async removeRollClicked():Promise<void> {
    await this._storage.removeRoll(this.roll.id);
    await this.removeRollFromSummary();
    this._router.navigateByUrl(AppConstant.LANDING_PAGE);
  }

  private async saveRoll(newRoll:boolean = false):Promise<void> {
    if(newRoll) {
      let uniqueIdFound:boolean = false;
      while (!uniqueIdFound) {
        let existingRoll:Roll|null = await this._storage.getRoll(this.roll.id);
        if (existingRoll == null) {
          uniqueIdFound = true;
        } else {
          this.roll.id = crypto.randomUUID(); // One more attempt at a unique ID
        }
      }
    }

    await this._storage.setRoll(this.roll.id, this.roll);
    console.log("saved roll with ID " + this.roll.id);
  }

  private async saveRollToSummary():Promise<void> {
    let existingRollsSummary:RollSummary[] = await this._storage.getRollsSummaryList() ?? [];
    let newRollSummary:RollSummary = new RollSummary();
    this.roll.id = newRollSummary.id;

    existingRollsSummary.push(newRollSummary);
    await this._storage.setRollsSummaryList(existingRollsSummary);
    console.log("saved roll summary");
    console.log(existingRollsSummary);
  }

  private async removeRollFromSummary():Promise<void> {
    let existingRollsSummary:RollSummary[] = await this._storage.getRollsSummaryList() ?? [];
    existingRollsSummary = existingRollsSummary.filter(r => r.id != this.roll.id);
    await this._storage.setRollsSummaryList(existingRollsSummary);
  }

  private static listFilmTypeOptions():FilmType[] {
    return [
      FilmType.BW,
      FilmType.COLOR,
      FilmType.INFRARED,
      FilmType.SLIDECOLOR
    ]
  }

}
