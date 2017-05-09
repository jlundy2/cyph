import {Component} from '@angular/core';
import {EnvService} from '../services/env.service';
import {StringsService} from '../services/strings.service';


/**
 * Angular component for help UI.
 */
@Component({
	selector: 'cyph-help',
	styleUrls: ['../../css/components/help.scss'],
	templateUrl: '../../templates/help.html'
})
export class HelpComponent {
	constructor (
		/** @see EnvService */
		public readonly envService: EnvService,

		/** @see StringsService */
		public readonly stringsService: StringsService
	) {}
}
