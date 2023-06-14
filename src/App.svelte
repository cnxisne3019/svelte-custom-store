<script lang="ts">
	import { user } from './lib/stores/user';

	let newToken: string;
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

	<pre style="text-align: left;">Store state: {JSON.stringify($user, null, 2)}</pre>

	<button on:click="{() => user.updateUserToken(newToken)}"> Update token </button>
	<button on:click="{() => user.fetchUserProfile()}"> Fetch Profile </button>
	<button on:click="{() => user.clear()}">Clear Session</button>
</main>
