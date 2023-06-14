import { writable } from 'svelte/store';

interface User {
	accessToken?: string;
	balance?: number;
	profile?: Profile;
}

interface Profile {
	firstName?: string;
	lastName?: string;
	avatar?: string;
}

const createUserStore = () => {
	const initialState: User = {
		accessToken: '',
		balance: 0,
		profile: {
			firstName: '',
			lastName: '',
			avatar: ''
		}
	};

	const { subscribe, update, set } = writable<User>(initialState);

	// Local function use only inside this environment
	function _getCurrentState(): User {
		let currentState: User;
		const unsubscribe = subscribe((current) => {
			console.log(`Running subscribe store method.`);
			currentState = current;
		});
		unsubscribe();

		return currentState;
	}

	// Utility function for this store
	function updateUserToken(src: string): void {
		if (!src)
			throw new Error(`Incoming token is invalid datatype or undefined.`);

		update((current: User) => {
			return { ...current, accessToken: src };
		});
	}

	function fetchUserProfile(src: { username: string; bankTag: string }): void {
		if (!src) throw new Error(`Source is invalid datatype.`);

		const { accessToken } = _getCurrentState();

		if (!accessToken) {
			throw new Error('Access token not found, Unable to fetch user profile');
		}

		//Assume you use fetch function to get user profile from API
		const response: User = {
			balance: 100,
			profile: {
				firstName: 'John',
				lastName: 'Doe',
				avatar: 'https://ui-avatars.com/api/?name=John+Doe'
			}
		};

		//if response is valid
		update((current: User) => {
			return {
				...current,
				balance: response.balance,
				profile: response.profile
			};
		});
	}

	function clear(): void {
		set(initialState);
	}

	return {
		subscribe,
		updateUserToken,
		fetchUserProfile,
		clear
	};
};

export const user = createUserStore();
