// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client';

export type Path =
	| `/`
	| `/activation`
	| `/browse`
	| `/collection`
	| `/collection/:cid/:page?`
	| `/history/:page?`
	| `/item/:slug/:page?`
	| `/item/:slug/detail/:id/:tab?`
	| `/popular/:slug?`
	| `/requests`
	| `/settings`
	| `/updates`;

export type Params = {
	'/collection/:cid/:page?': { cid: string; page?: string };
	'/history/:page?': { page?: string };
	'/item/:slug/:page?': { slug: string; page?: string };
	'/item/:slug/detail/:id/:tab?': { slug: string; id: string; tab?: string };
	'/popular/:slug?': { slug?: string };
};

export type ModalPath = never;

export const { Link, Navigate } = components<Path, Params>();
export const { useModals, useNavigate, useParams } = hooks<
	Path,
	Params,
	ModalPath
>();
export const { redirect } = utils<Path, Params>();
