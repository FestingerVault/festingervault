import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';
import useActivation from '@/hooks/use-activation';
import useBulk from '@/hooks/use-bulk';
import { __ } from '@/lib/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { sprintf } from '@wordpress/i18n';
import { ShoppingBag, X } from 'lucide-react';
import { memo } from 'react';
import { Alert } from './ui/alert';
import { Button } from './ui/button';
export default memo(function BulkAction() {
	const { items, removeItem, install, download } = useBulk();
	const { active, activated, can_bulk_download, can_bulk_install } =
		useActivation();
	return (
		(can_bulk_download || can_bulk_install) && (
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						size={items && items.length > 0 ? 'default' : 'icon'}
						className="gap-2"
						disabled={!activated || !active}
					>
						<ShoppingBag size={16} />
						{items.length > 0 && <span>{items.length}</span>}
					</Button>
				</SheetTrigger>
				<SheetContent className="overflow-y-auto py-3">
					<SheetHeader className="items-start">
						<SheetTitle>{__('Bulk Cart')}</SheetTitle>
						<SheetDescription>{__('Your items')}</SheetDescription>
					</SheetHeader>

					<div className="my-4 flex flex-col gap-5 sm:gap-4">
						{items.length > 0 ? (
							items.map((item) => (
								<div
									key={item.id}
									className="flex flex-col gap-2 sm:flex-row sm:items-center"
								>
									<div className="sm:w-14">
										<img
											src={item.image}
											className=" aspect-square w-20 object-contain sm:h-14 sm:w-14"
										/>
									</div>
									<div className="flex flex-1 flex-row gap-2">
										<div className="flex flex-1 flex-col gap-1 text-sm">
											<h3>
												{decodeEntities(item.title)}
											</h3>
											<div className="text-xs text-muted-foreground">
												{sprintf(
													__('Version: %s'),
													item.version
												)}
											</div>
										</div>
										<div>
											<Button
												variant="destructive"
												size="iconSmall"
												onClick={() => {
													removeItem(item.id);
												}}
											>
												<X size={16} />
											</Button>
										</div>
									</div>
								</div>
							))
						) : (
							<Alert className="text-muted-foreground">
								{__('No items found in bulk cart')}
							</Alert>
						)}
					</div>

					<SheetFooter className="gap-4">
						{can_bulk_install && (
							<SheetClose asChild>
								<Button
									disabled={items.length === 0}
									onClick={install}
								>
									{__('Install')}
								</Button>
							</SheetClose>
						)}
						{can_bulk_download && (
							<SheetClose asChild>
								<Button
									disabled={items.length === 0}
									onClick={download}
								>
									{__('Download')}
								</Button>
							</SheetClose>
						)}
					</SheetFooter>
				</SheetContent>
			</Sheet>
		)
	);
});
