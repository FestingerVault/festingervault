import AddCollectionButton from '@/components/add-collection-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from '@/components/ui/card';
import useBookmark from '@/hooks/use-collection';
import { __ } from '@/lib/i18n';
import { Link } from '@/router';
import { BookmarkCollectionType } from '@/types/bookmark';
import { decodeEntities } from '@wordpress/html-entities';
import { Globe, LockIcon } from 'lucide-react';

type Props = {
	collection: BookmarkCollectionType;
};

export default function Collection({ collection }: Props) {
	const { removeCollection } = useBookmark();
	return (
		<div>
			<Card>
				<CardHeader className="border-b">
					<div className="flex flex-row items-center justify-between gap-2">
						<Link
							to="/collection/:cid/:page?"
							params={{ cid: String(collection.id) }}
							className="flex flex-row items-start gap-2 "
						>
							<span
								className="mt-0.5 text-muted-foreground"
								title={
									collection.public
										? __('Public')
										: __('Private')
								}
							>
								{collection.public ? (
									<Globe size={16} />
								) : (
									<LockIcon size={16} />
								)}
							</span>
							<span className="text-lg leading-none">
								{decodeEntities(collection.title)}
							</span>
						</Link>
						{collection.count > 0 && (
							<Badge variant="secondary">
								{collection.count}
							</Badge>
						)}
					</div>
				</CardHeader>
				<CardContent className="space-y-2 text-sm text-muted-foreground">
					{collection.summary && collection.summary.length > 0 ? (
						<p>{decodeEntities(collection.summary)}</p>
					) : (
						<div className="text-xs italic text-muted-foreground">
							{__('No Description')}
						</div>
					)}
				</CardContent>
				<CardFooter className="border-t">
					<div className="flex flex-row gap-2">
						<Button
							variant="secondary"
							onClick={() => {
								if (
									confirm(
										__(
											'Are you sure you want to remove collection?'
										)
									)
								) {
									removeCollection(collection);
								}
							}}
							size="sm"
						>
							{__('Delete')}
						</Button>
						<AddCollectionButton
							collection={collection}
							update={true}
						>
							<Button
								variant="destructive"
								size="sm"
							>
								{__('Edit')}
							</Button>
						</AddCollectionButton>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
