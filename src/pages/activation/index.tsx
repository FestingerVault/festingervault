import { AppPageShell } from '@/components/body/page-shell';
import useActivation from '@/hooks/use-activation';
import { __ } from '@/lib/i18n';
import ActivationDetailItem from './_components/activation-detail';
import RegisterLicenseForm from './_components/register-license';

export default function Component() {
	const { data, isLoading, isFetching } = useActivation();

	return (
		<AppPageShell
			title={__('License Activation')}
			isLoading={isLoading}
			isFetching={isFetching}
			breadcrump={[
				{
					label: data?.activation_key
						? __('Activation Detail')
						: __('Activate License')
				}
			]}
		>
			<div>
				{data &&
					(data.activation_key ? (
						<ActivationDetailItem
							key={data.activation_key}
							detail={data}
						/>
					) : (
						<RegisterLicenseForm />
					))}
			</div>
		</AppPageShell>
	);
}
