import { writable } from 'svelte/store';

interface User {
	accessToken?: string;
	balance?: number;
	profile: Profile;
}

interface Profile {
	username: string;
	bankTag: string;
}

const createUserStore = () => {
	const initialState: User = {
		accessToken: '',
		balance: 0,
		profile: {
			username: '',
			bankTag: ''
		}
	};

	const { subscribe, update, set } = writable<User>(initialState);

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

		if (!accessToken)
			throw new Error('Access token not found, Unable to fetch user profile');

		//if response is valid
		update((current: User) => {
			return {
				...current,
				profile: {
					username: src.username,
					bankTag: src.bankTag
				}
			};
		});
	}

	function clear(): void {
		set(initialState);
	}

	function _getCurrentState(): User {
		let currentState: User;
		const unsubscribe = subscribe((current) => {
			console.log(`Running subscribe store method.`);
			currentState = current;
		});
		unsubscribe();

		return currentState;
	}

	return {
		subscribe,
		updateUserToken,
		fetchUserProfile,
		clear
	};
};

export const user = createUserStore();
