import { RollSummary } from './rollSummary';
import { StorageHandlerService } from './../services/storage-handler.service';
import { FilmType } from "./enums";
import { Shot } from "./shot";

export class Roll {
	public id:string = "";
	public filmBrand:string = "";
	public expirationDate:string|null = null;
	public filmType:FilmType|null = null;
	public lens:string = "";
	public camera:string = "";
	public expectedShotCount:number|null = null;
	public shots: Shot[] = [];

	constructor(private _storage:StorageHandlerService) {
		this.id = crypto.randomUUID();
	}

	public async getName():Promise<string|null> {
		let rollList:RollSummary[] = await this._storage.getRollsSummaryList();
		return rollList.find(r => r.id === this.id)?.name ?? null;
	}

	public addShot() {
		let shot = new Shot(this.lens, this.camera, this.shots.length + 1);
		this.shots.push(shot);
	}

	public toJSON():string {
		return JSON.stringify({
			a: this.id,
			b: this.filmBrand,
			c: this.expirationDate,
			d: this.filmType,
			e: this.lens,
			f: this.camera,
			g: this.expectedShotCount,
			h: this.shots
		});
	}

	public static fromJSON(json:string, storage:StorageHandlerService):Roll|null {
		if (json == null) {
			return null;
		}
		
		let roll:Roll = new Roll(storage);
		let parsed = JSON.parse(json);

		roll.id = parsed.a;
		roll.filmBrand = parsed.b;
		roll.expirationDate = parsed.c;
		roll.filmType = parsed.d;
		roll.lens = parsed.e;
		roll.camera = parsed.f;
		roll.expectedShotCount = parsed.g;
		roll.shots = parsed.h;

		return roll;
	}
}