import * as msgpack from 'msgpack-lite';
import {Form, IForm} from '../proto';


const newForm			= (
	components: Form.IComponent[],
	id?: string,
	idSeparator?: string
) : IForm => ({
	components,
	id,
	idSeparator
});

const newFormComponent	= (
	rows: (Form.IElementRow|Form.IElementRow[])[],
	id?: string,
	idSeparator?: string
) : Form.IComponent => ({
	id,
	idSeparator,
	rows: rows.reduce<Form.IElementRow[]>((a, b) => a.concat(b), [])
});

const newFormRow		= (
	elements: (Form.IElement|Form.IElement[])[],
	id?: string,
	idSeparator?: string
) : Form.IElementRow => ({
	elements: elements.reduce<Form.IElement[]>((a, b) => a.concat(b), []),
	id,
	idSeparator
});


const newFormElement	= <T extends {
	id?: string;
	label?: string;
	mask?: any;
	max?: number;
	min?: number;
	options?: string[];
	required?: boolean;
	value?: boolean|number|string;
	width?: number;
}> (elementType: Form.Element.Types) => (o?: T) => {
	const element: Form.IElement	= {
		id: o && o.id,
		label: o && o.label,
		mask: o && o.mask && msgpack.encode(o.mask),
		max: o && o.max,
		min: o && o.min,
		options: o && o.options,
		required: o && o.required,
		type: elementType,
		width: o && o.width
	};

	if (o && typeof o.value === 'boolean') {
		element.valueBoolean	= o.value;
	}
	else if (o && typeof o.value === 'number') {
		element.valueNumber		= o.value;
	}
	else if (o && typeof o.value === 'string') {
		element.valueString		= o.value;
	}

	return element;
};

/** Creates a new checkbox form element. */
export const checkbox		= newFormElement<{
	id?: string;
	label?: string;
	required?: boolean;
	value?: boolean;
	width?: number;
}>(Form.Element.Types.Checkbox);

/** Creates a new datepicker form element. */
export const datepicker		= newFormElement<{
	id?: string;
	label?: string;
	required?: boolean;
	value?: number;
	width?: number;
}>(Form.Element.Types.Datepicker);

/** Creates a new email input form element. */
export const emailInput		= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Email);

/** Creates a new text input form element. */
export const input			= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Input);

/** Creates a new number input form element. */
export const numberInput	= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	max?: number;
	min?: number;
	required?: boolean;
	value?: number;
	width?: number;
}>(Form.Element.Types.Number);

/** Creates a new password input form element. */
export const passwordInput	= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Password);

/** Creates a new radio button group form element. */
export const radio			= newFormElement<{
	id?: string;
	label?: string;
	options?: string[];
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Radio);

/** Creates a new select dropdown form element. */
export const select			= newFormElement<{
	id?: string;
	label?: string;
	options?: string[];
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Select);

/** Creates a new slider form element. */
export const slider			= newFormElement<{
	id?: string;
	label?: string;
	max?: number;
	min?: number;
	value?: number;
	width?: number;
}>(Form.Element.Types.Slider);

/** Creates a new slide toggle button form element. */
export const slideToggle	= newFormElement<{
	id?: string;
	label?: string;
	required?: boolean;
	value?: boolean;
	width?: number;
}>(Form.Element.Types.SlideToggle);

/** Creates a new text form element. */
export const text			= newFormElement<{
	id?: string;
	label?: string;
	value?: string;
	width?: number;
}>(Form.Element.Types.Text);

/** Creates a new textbox form element. */
export const textarea		= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Textarea);

/** Creates a new time input form element. */
export const timeInput		= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	max?: number;
	min?: number;
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.Time);

/** Creates a new URL input form element. */
export const urlInput		= newFormElement<{
	id?: string;
	label?: string;
	mask?: any;
	required?: boolean;
	value?: string;
	width?: number;
}>(Form.Element.Types.URL);

/** Form title element row. */
export const title		= (titleText: string) : Form.IElementRow => {
	return newFormRow([text({label: titleText, width: 100})]);
};

/** Phone number element row. */
export const phone		= (id: string = 'telecom') : Form.IElementRow => {
	return newFormRow([input({
		id,
		label: 'Phone Number',
		mask: {
			mask: [
				'(', /[1-9]/, /\d/, /\d/, ')', ' ',
				/\d/, /\d/, /\d/, '-',
				/\d/, /\d/, /\d/, /\d/
			],
			showMask: true
		}
	})]);
};

/** Email address element row. */
export const email		= (id?: string) : Form.IElementRow => {
	return newFormRow([emailInput({id, label: 'Email', required: true})]);
};

/** Name element row. */
export const name		= (id: string = 'name') : Form.IElementRow => {
	return newFormRow(
		[
			input({label: 'First Name', required: true}),
			input({label: 'Middle Name'}),
			input({label: 'Last Name', required: true})
		],
		id,
		' '
	);
};

/** Address element row. */
export const address	= (id: string = 'address') : Form.IElementRow => {
	return newFormRow(
		[
			input({label: 'Address'}),
			input({label: 'City'}),
			input({label: 'State', width: 10}),
			input({label: 'Zip', width: 25})
		],
		id,
		', '
	);
};

/** SSN element row. */
export const ssn		= (id?: string) : Form.IElementRow => {
	return newFormRow([input({
		id,
		label: 'Social Security Number',
		mask: {
			mask: [
				/\d/, /\d/, /\d/, '-',
				/\d/, /\d/, '-',
				/\d/, /\d/, /\d/, /\d/
			],
			placeholderChar: '#',
			showMask: true
		},
		width: 20
	})]);
};

/** Contact information component. */
export const contact			= (id?: string) : Form.IComponent => {
	return newFormComponent(
		[
			title('Contact Information'),
			name(),
			email(),
			phone()
		],
		id
	);
};

/** Insurance information element row. */
export const insurance			= (id?: string) : Form.IElementRow => {
	return newFormRow(
		[
			input({label: "Insured's name"}),
			input({label: 'Relationship'}),
			input({label: 'Employer'}),
			input({label: 'Phone Number'})
		],
		id
	);
};

/** Insurance information component. */
export const insuranceComponent	= (id?: string) : Form.IComponent => {
	return newFormComponent(
		[
			title('Primary Insurance'),
			insurance(),
			address(),
			newFormRow([input({label: 'Insurance Company'})]),
			title('Secondary Insurance'),
			insurance(),
			address(),
			newFormRow([input({label: 'Insurance Company'})])
		],
		id
	);
};

/** New patient form. */
export const newPatient			= () : IForm => newForm(
	[
		newFormComponent([title('New Patient Form')]),
		contact(),
		insuranceComponent('')
	],
	'patient'
);
