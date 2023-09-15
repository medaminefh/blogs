export interface IBlog {
	_id?: string;
	updatedAt: string;
	categories: string[];
	long: string;
	short: string;
	title: string;
	img_url: string;
	private: boolean;
	counter?: number;
}
