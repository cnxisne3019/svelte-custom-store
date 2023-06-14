<script lang="ts">
	import { user } from './lib/stores/user';

	let newToken: string;
	const responseUser = {
		username: 'exoa0032',
		bankTag: 'scb'
	};
</script>

<main>
	<label for="accessToken">
		<span>Set new <b>accessToken</b> :</span>
		<input
			type="text"
			name="accessToken"
			bind:value="{newToken}"
			placeholder="Enter your access token"
		/>
	</label>
	<p>user Store:</p>
	<pre style="text-align: left;">{JSON.stringify($user, null, 2)}</pre>

	<button on:click="{() => user.updateUserToken(newToken)}">
		Update token
	</button>

	<button on:click="{() => user.fetchUserProfile(responseUser)}">
		Fetch Profile
	</button>

	<button on:click="{() => user.clear()}">Clear Session</button>
</main>
