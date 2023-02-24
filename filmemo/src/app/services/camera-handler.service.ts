import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Injectable({
	providedIn: 'root'
})
export class CameraHandlerService {

	// Adapted from https://ionicframework.com/docs/native/camera
	async takePicture(): Promise<string|undefined> {
		const image = await Camera.getPhoto({
		quality: 90,
		allowEditing: true,
		resultType: CameraResultType.DataUrl,
		height: 540
		});

		return image.dataUrl;
	}
}
