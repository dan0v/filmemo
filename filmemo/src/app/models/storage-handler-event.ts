import { StorageHandlerEventType } from "./enums";

export class StorageHandlerEvent {
	public readonly eventType:StorageHandlerEventType;
	public readonly additionalData:string|null;

	constructor(eventType:StorageHandlerEventType, additionalData:string|null = null) {
		this.eventType = eventType;
		this.additionalData = additionalData;
	}
}