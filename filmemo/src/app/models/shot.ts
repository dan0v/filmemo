import { StorageHandlerService } from "../services/storage-handler.service";

export class Shot {
	public shotNumber:number = 1;
	public aperture:number|null = null;
	public shutterSpeed:number|null = null;
	public lens:string = "";
	public camera:string = ""
	public location:string = "";
	public conditions:string = "";
	public notes:string = "";
	public referenceImageId:string|null = null;

	public async setImage(storage:StorageHandlerService, image:string):Promise<void> {
		let imgId = crypto.randomUUID();
		await storage.addImage(imgId, image);
		await this.removeImage(storage);
		this.referenceImageId = imgId;
	}

	public async removeImage(storage:StorageHandlerService):Promise<void> {
		if (this.referenceImageId != null) {
			await storage.removeImage(this.referenceImageId);
			this.referenceImageId = null;
		}
	}

	constructor(lens:string, camera:string, shotNumber:number) {
		this.lens = lens;
		this.camera = camera;
		this.shotNumber = shotNumber;
	}
}