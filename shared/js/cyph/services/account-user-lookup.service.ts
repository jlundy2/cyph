import {Injectable} from '@angular/core';
import {userPresenceSorted} from '../account/enums';
import {User} from '../account/user';
import {util} from '../util';


/**
 * Account user lookup service.
 */
@Injectable()
export class AccountUserLookupService {
	/** @ignore */
	public static DUMMY_USERS: User[]	= [

	].map(user => new User(
		user.avatar,
		user.email,
		user.hasPremium,
		user.name,
		userPresenceSorted[util.random(userPresenceSorted.length)],
		user.realUsername
	));

	/** Tries to to get user object for the specified username. */
	public async getUser (username: string) : Promise<User> {
		const user	= AccountUserLookupService.DUMMY_USERS.find(o =>
			o.username === username.toLowerCase()
		);

		if (user) {
			return user;
		}
		else {
			throw new Error(`User ${username} not found.`);
		}
	}

	constructor () {}
}
