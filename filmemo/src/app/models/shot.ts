
export class Shot {
	public shotNumber:number = 1;
	public aperture:number|null = null;
	public shutterSpeed:number|null = null;
	public lens:string = "";
	public camera:string = ""
	public location:string = "";
	public conditions:string = "";
	public notes:string = "";

	private referenceImageId:string|null = null;

	constructor(lens:string, camera:string, shotNumber:number) {
		this.lens = lens;
		this.camera = camera;
		this.shotNumber = shotNumber;
	}

	public getReferenceImage() {
		if (this.referenceImageId != null) {
			
		}
	}
}