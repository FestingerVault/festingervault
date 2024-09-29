export type ActivationDetailType = {
	activation_key: string;
	activation_limit: number;
	activation_count: number;
	domain: string;
	created: number;
	expires: number;
	status: 'active' | 'inactive' | 'expired' | 'not-activated';
	plan_type: string;
	plan_title: string;
	plan_detail: string;
	total_limit: number;
	today_limit: number;
	today_limit_used: number;
};
