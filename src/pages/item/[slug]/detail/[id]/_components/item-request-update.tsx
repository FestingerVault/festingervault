import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useApiMutation from '@/hooks/use-api-mutation';
import { __ } from '@/lib/i18n';
import { useParams } from '@/router';
import { TPostItem } from '@/types/item';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
type Props = {
	item: TPostItem;
};
export const updateRequestSchema = z.object({
	version: z
		.string({ required_error: __('Version number cannot be empty') })
		.regex(/^(?![0.]+$)[A-Z\d]+(?:\.[A-Z\d]+){1,5}$/i, {
			message: 'Invalid version number'
		})
});
type TUpdateRequest = z.infer<typeof updateRequestSchema>;
export default function ItemRequestUpdate({ item }: Props) {
	const params = useParams('/item/:slug/detail/:id/:tab?');
	const form = useForm<TUpdateRequest>({
		resolver: zodResolver(updateRequestSchema),
		defaultValues: {
			version: ''
		}
	});
	const { isPending, mutateAsync } = useApiMutation('item/request-update');
	async function onSubmit(data: TUpdateRequest) {
		toast.promise(mutateAsync({ ...data, item_id: item.id }), {
			loading: __('Making Update Request'),
			success: () => {
				return __('Update request sent successfully');
			},
			error: (err) => err.message ?? __('Error making request'),
			finally() {
				form.reset();
			}
		});
	}
	return (
		<div className="flex flex-col gap-5 sm:gap-7">
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Form {...form}>
					<Card>
						<CardHeader className="border-b p-5 sm:p-7">
							{__('Request Update')}
						</CardHeader>
						<CardContent className="p-5 text-sm sm:p-7">
							<FormField
								control={form.control}
								name="version"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder={__('New version')}
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter>
							<Button
								variant="default"
								type="submit"
								disabled={isPending}
								className="gap-2"
							>
								<span>{__('Request Update')}</span>
								{isPending ? (
									<Loader className="h-4 w-4 animate-spin" />
								) : null}
							</Button>
						</CardFooter>
					</Card>
				</Form>
			</form>
		</div>
	);
}
