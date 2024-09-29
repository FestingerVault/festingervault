import { __ } from '@/lib/i18n';
import { z } from 'zod';

export const licenseFormZodSchema = z.object({
	license_key: z
		.string({ required_error: __('License Key Field is empty') })
		.min(1, __('Enter valid license key'))
});
