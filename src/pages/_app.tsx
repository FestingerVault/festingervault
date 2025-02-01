import Layout from '@/layouts/Layout';
import { __ } from '@/lib/i18n';
import { useLocation, useNavigate } from 'react-router-dom';
export default function Component() {
	return <Layout />;
}
export function Catch() {
	const navigate = useNavigate();
	const location = useLocation();
	function onBack() {
		if (location.key !== 'default') {
			navigate(-1);
		} else {
			navigate('/');
		}
	}
	return (
		<main className="flex h-screen w-full flex-col items-center justify-center bg-[#1A2238]">
			<h1 className="text-9xl font-extrabold tracking-widest text-white">
				{__('OOPS!')}
			</h1>
			<div className="absolute rotate-12 rounded bg-[#FF6A3D] px-2 text-sm">
				{__('Something Went Wrong')}
			</div>
			<button className="mt-5">
				<a
					className="group relative inline-block text-sm font-medium text-[#FF6A3D] focus:outline-none focus:ring active:text-orange-500"
					onClick={onBack}
				>
					<span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

					<span className="relative block border border-current bg-[#1A2238] px-8 py-3">
						{__('Go Back')}
					</span>
				</a>
			</button>
		</main>
	);
}
