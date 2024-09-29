import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
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
import { licenseFormZodSchema } from '@/zod/license';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

type LicenseActivationResponse = {
	activation_key: string;
};
export type LicenseActivationSchema = z.infer<typeof licenseFormZodSchema>;
export default function RegisterLicenseForm() {
	const queryClient = useQueryClient();
	const form = useForm<LicenseActivationSchema>({
		resolver: zodResolver(licenseFormZodSchema),
		defaultValues: {
			license_key: ''
		}
	});
	const { isPending, mutateAsync } = useApiMutation<
		LicenseActivationResponse,
		LicenseActivationSchema
	>('license/activate');
	async function onSubmit(data: LicenseActivationSchema) {
		try {
			await mutateAsync(data);
			toast.success(__('License Activated Successfully'));
			form.reset();
			queryClient.invalidateQueries({ queryKey: ['license/detail'] });
		} catch (error) {
			toast.error(
				(error as { message?: string })?.message ??
					__('Error Activating License')
			);
			form.reset();
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>{__('Activate License')}</CardTitle>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name="license_key"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder={__(
												'Enter License Key'
											)}
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
							<span>{__('Activate License')}</span>
							{isPending ? (
								<Loader className="h-4 w-4 animate-spin" />
							) : null}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
