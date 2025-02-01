import { AppPageShell } from '@/components/body/page-shell';
import { Button } from '@/components/ui/button';
import useActivation from '@/hooks/use-activation';
import { __ } from '@/lib/i18n';
import LicenseStatus from '../_components/license-status';
import RegisterLicenseForm from './_components/register-license';

export default function Component() {
	const {
		activated,
		deactivate,
		isDeactivatePending,
		isFetching,
		isLoading
	} = useActivation();

	return (
		<AppPageShell
			title={__('License Activation')}
			isFetching={isFetching}
			isLoading={isLoading}
			breadcrump={[
				{
					label: activated
						? __('Activation Detail')
						: __('Activate License')
				}
			]}
		>
			<div className="flex flex-col gap-5">
				{activated ? (
					<>
						<LicenseStatus />
						<div className="flex flex-row gap-4">
							<Button
								onClick={() => {
									if (
										confirm(
											__(
												'Are you sure you want to deactivate your license?'
											)
										)
									) {
										deactivate();
									}
								}}
								variant="destructive"
								disabled={isDeactivatePending}
								className="flex flex-row gap-2"
							>
								{__('Deactivate')}
							</Button>
						</div>
					</>
				) : (
					<RegisterLicenseForm />
				)}
			</div>
		</AppPageShell>
	);
}
