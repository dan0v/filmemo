import { Aperture } from './../models/enums';
import { StorageHandlerService } from './../services/storage-handler.service';
import { Shot } from './../models/shot';
import { Component, Input, OnInit } from '@angular/core';
import { Roll } from '../models/roll';

@Component({
  selector: 'app-shot',
  templateUrl: './shot.component.html',
  styleUrls: ['./shot.component.scss'],
})
export class ShotComponent implements OnInit {

  @Input()
  roll:Roll = new Roll(this._storage);
  
  @Input()
  shot:Shot = new Shot("","",0);

  @Input()
  shotCount:number = 0;

  protected cameraText:string = "";
  protected lensText:string = "";
  protected locationText:string = "";
  protected conditionsText:string = "";
  protected notesText:string = "";
  protected shutterSpeedText:string = "";

  protected apertureOptions:number[] = Aperture.thirdStops();

  constructor(private _storage:StorageHandlerService) { }

  ngOnInit() {
    this.cameraText = this.shot.camera;
    this.lensText = this.shot.lens;
    this.locationText = this.shot.location;
    this.conditionsText = this.shot.conditions;
    this.notesText = this.shot.notes;
    this.shutterSpeedText = this.shot.shutterSpeed + "";
    console.log(this.apertureOptions);
  }

  protected async removeShotClicked():Promise<void> {
    this.roll.removeShot(this.shotCount);
    await this.roll.save();
  }

  protected async cameraChanged(event:any):Promise<void> {
    if (this.cameraText != event.detail.value) {
      this.cameraText = event.detail.value;
    }
  }

  protected async cameraCommitted(event:any):Promise<void> {
    if (this.shot.camera != this.cameraText) {
      this.shot.camera = this.cameraText;
      await this.roll.save();
    }
  }

  protected async lensChanged(event:any):Promise<void> {
    if (this.lensText != event.detail.value) {
      this.lensText = event.detail.value;
    }
  }

  protected async lensCommitted(event:any):Promise<void> {
    if (this.shot.lens != this.lensText) {
      this.shot.lens = this.lensText;
      await this.roll.save();
    }
  }

  protected async shutterSpeedCommitted(event:any):Promise<void> {
    if (this.shot.shutterSpeed != parseFloat(event.detail.value)) {
      this.shot.shutterSpeed = parseFloat(event.detail.value);
      await this.roll.save();
    }
  }

  protected async apertureCommitted(event:any):Promise<void> {
    console.log("changed");
    if (this.shot.aperture != parseFloat(event.detail.value)) {
      this.shot.aperture = parseFloat(event.detail.value);
      await this.roll.save();
      console.log("saved");
    }
  }

  protected async locationChanged(event:any):Promise<void> {
    if (this.locationText != event.detail.value) {
      this.locationText = event.detail.value;
    }
  }

  protected async locationCommitted(event:any):Promise<void> {
    if (this.shot.location != this.locationText) {
      this.shot.location = this.locationText;
      await this.roll.save();
    }
  }

  protected async conditionsChanged(event:any):Promise<void> {
    if (this.conditionsText != event.detail.value) {
      this.conditionsText = event.detail.value;
    }
  }

  protected async conditionsCommitted(event:any):Promise<void> {
    if (this.shot.conditions != this.conditionsText) {
      this.shot.conditions = this.conditionsText;
      await this.roll.save();
    }
  }

  protected async notesChanged(event:any):Promise<void> {
    if (this.notesText != event.detail.value) {
      this.notesText = event.detail.value;
    }
  }

  protected async notesCommitted(event:any):Promise<void> {
    if (this.shot.notes != this.notesText) {
      this.shot.notes = this.notesText;
      await this.roll.save();
    }
  }

  protected compareNumbers(o1:number, o2:number):boolean {
    return o1 == o2;
  }

}
