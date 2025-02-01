import { BulkItemType } from '@/hooks/use-bulk';
import { TActivationDetail } from '@/types/license';
import { Store } from '@tanstack/store';

type TStore = {
	activated: boolean;
	active: boolean;
	license: TActivationDetail;
	bulk: Array<BulkItemType>;
	status: string;
};
export const store = new Store<TStore>({
	activated: false,
	active: false,
	license: null,
	status: 'inactive',
	bulk: []
});
