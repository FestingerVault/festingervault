import { BulkItemType } from '@/hooks/use-bulk';
import { ActivationDetailType } from '@/types/license';
import { Store } from '@tanstack/store';

type TStore = {
	activated: boolean;
	license: ActivationDetailType;
	bulk: Array<BulkItemType>;
};
export const store = new Store<TStore>({
	activated: false,
	license: null,
	bulk: []
});
