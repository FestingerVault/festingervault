import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import useSetting from '@/hooks/use-setting';
import { __ } from '@/lib/i18n';
import moment from 'moment';
import SettingControl from './settings-control';
const weekdaysShort = moment.weekdaysMin();
export default function AutoupdateSetting() {
	const { updateSettings, settings, setSetting } = useSetting();

	return (
		!!settings && (
			<>
				<Card>
					<CardHeader className="border-b">
						{__('Auto Update')}
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<div className="flex flex-col gap-7 sm:gap-4">
							<SettingControl
								label={__('Days Of Week')}
								description={__(
									'Select days of week when you want autoupdate to run.'
								)}
							>
								<div className="flex flex-row flex-wrap items-center gap-5">
									{Array.from(
										{ length: 7 },
										(_, index) => index
									).map((day) => (
										<label
											className="flex flex-row items-center gap-2 text-sm uppercase"
											key={day}
										>
											<Checkbox
												checked={settings.autoupdate_day_of_week?.includes(
													day
												)}
												onCheckedChange={(checked) => {
													const _days = new Set(
														settings.autoupdate_day_of_week
													);
													if (checked) {
														_days.add(day);
													} else {
														_days.delete(day);
													}
													setSetting(
														'autoupdate_day_of_week',
														Array.from(_days)
													);
												}}
											/>
											<span>{weekdaysShort[day]}</span>
										</label>
									))}
								</div>
							</SettingControl>
						</div>
						<div className="flex flex-col gap-7 sm:gap-2">
							<SettingControl
								label={__('Time')}
								description={__(
									'Select time to day to schedule autoupdate.'
								)}
							>
								<div className="flex flex-row items-center gap-5">
									<div>
										<Select
											onValueChange={(val) =>
												setSetting(
													'autoupdate_hour',
													val
												)
											}
											defaultValue={settings.autoupdate_hour.toString()}
										>
											<SelectTrigger className="w-[80px]">
												<SelectValue placeholder="00" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{Array.from(
														{ length: 24 },
														(_, index) => index
													).map((hour) => (
														<SelectItem
															value={hour.toString()}
															key={hour}
														>
															{hour
																.toString()
																.padStart(
																	2,
																	'0'
																)}
														</SelectItem>
													))}{' '}
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
									<span>:</span>
									<div>
										<Select onValueChange={(val) =>
												setSetting(
													'autoupdate_minute',
													val
												)
											}
											defaultValue={settings.autoupdate_minute.toString()}>
											<SelectTrigger className="w-[80px]">
												<SelectValue placeholder="00" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{Array.from(
														{ length: 60 },
														(_, index) => index
													).map((hour) => (
														<SelectItem
															value={hour.toString()}
															key={hour}
														>
															{hour
																.toString()
																.padStart(
																	2,
																	'0'
																)}
														</SelectItem>
													))}{' '}
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
								</div>
							</SettingControl>
						</div>
					</CardContent>
					<CardFooter>
						<Button onClick={updateSettings}>
							{__('Save Settings')}
						</Button>
					</CardFooter>
				</Card>
			</>
		)
	);
}
