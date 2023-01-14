
export class Aperture {
	public static fullStops():number[] {
		return [
			1,
			1.4,
			2,
			2.8,
			4,
			5.6,
			8,
			11,
			16,
			22,
			32
		];
	}

	public static halfStops():number[] {
		return [
			1.2,
			1.7,
			2.4,
			3.3,
			4.8,
			6.7,
			9.5,
			13,
			19,
			27,
		].concat(Aperture.fullStops()).sort();
	}

	public static thirdStops():number[] {
		return [
			1.1,
			1.6,
			1.8,
			2.2,
			2.5,
			3.2,
			3.5,
			4.5,
			5,
			6.3,
			7.1,
			9,
			10,
			14,
			18,
			20,
			25,
			29,
			36
		].concat(Aperture.halfStops()).sort();
	}
}

export enum FilmType {
	COLOR = "Color",
	BW = "Black and white",
	SLIDECOLOR = "Slide color",
	INFRARED = "Infrared"
}

export enum AppConstant {
	ROLLS_SUMMARY_LIST = "rollsSummaryList",
	IMAGES_LIST = "imagesList",
	ID_PARAM = "id",
	NEW_ROLL_ID = "new",
	LANDING_PAGE = "/landing",
	DATE_FORMAT = "YYYY-MM-dd"
}

export enum StorageHandlerEventType {
	ROLLS_SUMMARY_UPDATED,
	ROLL_UPDATED    
}