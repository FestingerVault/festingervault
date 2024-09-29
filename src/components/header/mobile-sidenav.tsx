import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';
import { __ } from '@/lib/i18n';
import { MenuIcon } from 'lucide-react';
import { Sidebar } from '../sidebar/Sidebar';

export function MobileSidenav() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="outline"
					size="iconSmall"
				>
					<MenuIcon className="h-4 w-4" />
					<p className="sr-only">{__('Open menu')}</p>
				</Button>
			</SheetTrigger>

			<SheetContent
				side="left"
				className="px-3 pb-3 pt-10"
			>
				<SheetHeader className="hidden">
					<SheetTitle></SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<Sidebar showLogo={false} />
			</SheetContent>
		</Sheet>
	);
}
