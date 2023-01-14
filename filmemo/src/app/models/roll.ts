import { RollSummary } from './rollSummary';
import { StorageHandlerService } from './../services/storage-handler.service';
import { FilmType } from "./enums";
import { Shot } from "./shot";

export class Roll {
	public id:string = "";
	public film:string = "";
	public expirationDate:string|null = "2000/01/01";
	public color:FilmType = FilmType.BW;
	public lens:string = "";
	public camera:string = "";
	public expectedShotCount:number = 36;
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
			id: this.id,
			film: this.film,
			expirationDate: this.expirationDate,
			color: this.color,
			lens: this.lens,
			camera: this.camera,
			expectedShotCount: this.expectedShotCount,
			shots: this.shots
		});
	}

	public static fromJSON(json:string, storage:StorageHandlerService):Roll|null {
		if (json == null) {
			return null;
		}
		
		let roll:Roll = new Roll(storage);
		let parsed = JSON.parse(json);

		roll.id = parsed.id;
		roll.film = parsed.film;
		roll.expirationDate = parsed.expirationDate;
		roll.color = parsed.color;
		roll.lens = parsed.lens;
		roll.camera = parsed.camera;
		roll.expectedShotCount = parsed.expectedShotCount;
		roll.shots = parsed.shots;

		return roll;
	}
}