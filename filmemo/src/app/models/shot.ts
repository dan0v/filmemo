import { Aperture } from "./enums";

export class Shot {
	private shotNumber:number = 1;
	private aperture:Aperture|null = null;
	private shutterSpeed:number|null = null;
	private lens:string = "";
	private camera:string = ""
	private location:string = "";
	private conditions:string = "";
	private notes:string = "";

	private referenceImageId:string|null = null;

	constructor(lens:string, camera:string, shotNumber:number) {
		this.lens = lens;
		this.camera = camera;
		this.shotNumber = shotNumber;
	}

	protected getReferenceImage() {
		if (this.referenceImageId != null) {
			
		}
	}
}