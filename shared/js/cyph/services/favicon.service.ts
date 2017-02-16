import {Injectable} from '@angular/core';
import * as $ from 'jquery';
import {EnvService} from './env.service';


/**
 * Manages favicon.
 */
@Injectable()
export class FaviconService {
	private static faviconSets: {[name: string]: {
		apple114: string;
		apple120: string;
		apple144: string;
		apple152: string;
		apple180: string;
		apple57: string;
		apple60: string;
		apple72: string;
		apple76: string;
		icon16: string;
		icon160: string;
		icon192: string;
		icon256: string;
		icon32: string;
		icon96: string;
		mask: string;
		mstile: string;
		shortcut196: string;
	}}	= {
		default: {
			apple114: '',
			apple120: '',
			apple144: '',
			apple152: '',
			apple180: '',
			apple57: '',
			apple60: '',
			apple72: '',
			apple76: '',
			icon16: '',
			icon160: '',
			icon192: '',
			icon256: '',
			icon32: '',
			icon96: '',
			mask: '',
			mstile: '',
			shortcut196: ''
		},
		telehealth: {
			apple114: '/img/favicon/telehealth/apple-touch-icon-114x114.png',
			apple120: '/img/favicon/telehealth/apple-touch-icon-120x120.png',
			apple144: '/img/favicon/telehealth/apple-touch-icon-144x144.png',
			apple152: '/img/favicon/telehealth/apple-touch-icon-152x152.png',
			apple180: '/img/favicon/telehealth/apple-touch-icon-180x180.png',
			apple57: '/img/favicon/telehealth/apple-touch-icon-57x57.png',
			apple60: '/img/favicon/telehealth/apple-touch-icon-60x60.png',
			apple72: '/img/favicon/telehealth/apple-touch-icon-72x72.png',
			apple76: '/img/favicon/telehealth/apple-touch-icon-76x76.png',
			icon16: '/img/favicon/telehealth/favicon-16x16.png',
			icon160: '/img/favicon/telehealth/favicon-160x160.png',
			icon192: '/img/favicon/telehealth/favicon-192x192.png',
			icon256: '/img/favicon/telehealth/favicon-256x256.png',
			icon32: '/img/favicon/telehealth/favicon-32x32.png',
			icon96: '/img/favicon/telehealth/favicon-96x96.png',
			mask: '/img/favicon/telehealth/mask.svg',
			mstile: '/img/favicon/telehealth/mstile-144x144.png',
			shortcut196: '/img/favicon/telehealth/favicon-196x196.png'
		}
	};


	private elements	= {
		apple: (size: string) => $(`link[rel='apple-touch-icon'][sizes='${size}x${size}']`),
		icon: (size: string) => $(`link[rel='icon'][sizes='${size}x${size}']`),
		mask: () => $(`link[rel='mask-icon']`),
		mstile: () => $(`meta[name='msapplication-TileImage']`),
		shortcut: (size: string) => $(`link[rel='shortcut icon'][sizes='${size}x${size}']`)
	};

	/**
	 * Changes favicon at run-time for non-co-branded instances.
	 * @param name Name of folder containing alternate favicon set under /img/favicons.
	 */
	public setFavicon (name: 'default'|'telehealth' = 'default') : void {
		if (!this.envService.isWeb) {
			/* TODO: HANDLE NATIVE */
			return;
		}

		if (this.envService.coBranded) {
			return;
		}

		const faviconSet	= FaviconService.faviconSets[name];

		this.elements.apple('114').attr('href', faviconSet.apple114);
		this.elements.apple('120').attr('href', faviconSet.apple120);
		this.elements.apple('144').attr('href', faviconSet.apple144);
		this.elements.apple('152').attr('href', faviconSet.apple152);
		this.elements.apple('180').attr('href', faviconSet.apple180);
		this.elements.apple('57').attr('href', faviconSet.apple57);
		this.elements.apple('60').attr('href', faviconSet.apple60);
		this.elements.apple('72').attr('href', faviconSet.apple72);
		this.elements.apple('76').attr('href', faviconSet.apple76);
		this.elements.icon('16').attr('href', faviconSet.icon16);
		this.elements.icon('160').attr('href', faviconSet.icon160);
		this.elements.icon('192').attr('href', faviconSet.icon192);
		this.elements.icon('256').attr('href', faviconSet.icon256);
		this.elements.icon('32').attr('href', faviconSet.icon32);
		this.elements.icon('96').attr('href', faviconSet.icon96);
		this.elements.mask().attr('href', faviconSet.mask);
		this.elements.mstile().attr('content', faviconSet.mstile);
		this.elements.shortcut('196').attr('href', faviconSet.shortcut196);
	}

	constructor (
		/** @ignore */
		private readonly envService: EnvService
	) {
		const defaultFaviconSet	= FaviconService.faviconSets['default'];

		if (this.envService.isWeb && !defaultFaviconSet.apple114) {
			defaultFaviconSet.apple114		= this.elements.apple('114').attr('href');
			defaultFaviconSet.apple120		= this.elements.apple('120').attr('href');
			defaultFaviconSet.apple144		= this.elements.apple('144').attr('href');
			defaultFaviconSet.apple152		= this.elements.apple('152').attr('href');
			defaultFaviconSet.apple180		= this.elements.apple('180').attr('href');
			defaultFaviconSet.apple57		= this.elements.apple('57').attr('href');
			defaultFaviconSet.apple60		= this.elements.apple('60').attr('href');
			defaultFaviconSet.apple72		= this.elements.apple('72').attr('href');
			defaultFaviconSet.apple76		= this.elements.apple('76').attr('href');
			defaultFaviconSet.icon16		= this.elements.icon('16').attr('href');
			defaultFaviconSet.icon160		= this.elements.icon('160').attr('href');
			defaultFaviconSet.icon192		= this.elements.icon('192').attr('href');
			defaultFaviconSet.icon256		= this.elements.icon('256').attr('href');
			defaultFaviconSet.icon32		= this.elements.icon('32').attr('href');
			defaultFaviconSet.icon96		= this.elements.icon('96').attr('href');
			defaultFaviconSet.mask			= this.elements.mask().attr('href');
			defaultFaviconSet.mstile		= this.elements.mstile().attr('content');
			defaultFaviconSet.shortcut196	= this.elements.shortcut('196').attr('href');
		}
	}
}