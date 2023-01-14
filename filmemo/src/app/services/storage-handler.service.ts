import { RollSummary } from './../models/rollSummary';
import { AppConstant, StorageHandlerEventType } from './../models/enums';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { Roll } from '../models/roll';
import { StorageHandlerEvent } from '../models/storage-handler-event';

@Injectable({
  providedIn: 'root'
})
export class StorageHandlerService {
  private _storage:Storage|null = null;
  private _initializing = true;

  private _saveObservable:Subject<StorageHandlerEvent> = new Subject<any>();

  constructor(private loadStorage:Storage) {}

  public async init() {
    await this.loadStorage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.loadStorage.create();
    this._storage = storage;
    this._initializing = false;
  }

  private async busyWaitInitialization():Promise<void> {
    while (this._initializing) {
      await new Promise(t => setTimeout(t, 100));
    }
  }

  public async setRoll(id:string, roll:Roll):Promise<void> {
    return this.busyWaitInitialization().then(async () => {
      return await this._storage?.set(id, roll.toJSON());
    });
  }

  public async getRoll(id:string):Promise<Roll|null> {
    return this.busyWaitInitialization().then(async () => {
      return Roll.fromJSON(await this._storage?.get(id), this);
    });
  }

  public async setRollsSummaryList(rollSummaryList:RollSummary[]):Promise<void> {
    return this.busyWaitInitialization().then(async () => {
      await this._storage?.set(AppConstant.ROLLS_SUMMARY_LIST, rollSummaryList);
      this._saveObservable.next(new StorageHandlerEvent(StorageHandlerEventType.ROLLS_SUMMARY_UPDATED));
      return;
    });
  }

  public async getRollsSummaryList():Promise<RollSummary[]> {
    return this.busyWaitInitialization().then(async () => {
      return (await this._storage?.get(AppConstant.ROLLS_SUMMARY_LIST)) ?? [];
    });
  }

  public async removeRoll(key:string):Promise<any> {
    return this.busyWaitInitialization().then(async () => {
      return await this._storage?.remove(key);
    });
  }

  public async clear() {
    return this.busyWaitInitialization().then(async () => {
      await this._storage?.clear();
      this._saveObservable.next(new StorageHandlerEvent(StorageHandlerEventType.ROLLS_SUMMARY_UPDATED));
      return
    });
  }

  public getObservable():Observable<StorageHandlerEvent> {
    return this._saveObservable.asObservable();
  }

}
