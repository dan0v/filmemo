
export class RollSummary {
	public id:string = "";
	public name:string = "New";

	constructor() {
		this.id = crypto.randomUUID();
	}
}