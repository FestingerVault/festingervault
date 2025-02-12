export type TActivationDetail = {
	active: boolean;
	activation_key: string;
	activation_limit: number;
	activation_count: number;
	domain: string;
	created: number;
	expires: number;
	status:
		| 'active'
		| 'inactive'
		| 'expired'
		| 'not-activated'
		| 'license-suspended'
		| 'activation-suspended'
		| 'domain-blocked';
	reason?: string;
	plan_type: string;
	plan_title: string;
	plan_detail: string;
	total_limit: number;
	today_limit: number;
	today_limit_used: number;
	bronze: boolean;
	silver: boolean;
	gold: boolean;
	roles?: boolean;
	download_allowed:boolean;
	install_allowed:boolean;
	bulk_download:boolean;
	bulk_install:boolean;
	autoupdate:boolean;
};
