<script lang="ts">
	import { serverMessageStore } from "$lib/stores";

    let serverMessages: string[] = [`Welcome to the Server`];

    serverMessageStore.subscribe((data: string[]) => {
        serverMessages = data;
    });

</script>

<div class="server-panel">
    <div class="server-head">
        <span class="server-label">Server Messages</span>
        <span class="server-value">Count: {serverMessages.length}</span>
    </div>
    {#each serverMessages as serverMessage}
        <div class="server-item">
            <div class="server-label">{new Date(serverMessage.timestamp).toLocaleString()}</div>
            <div class="server-message">{serverMessage.message}</div>
        </div>
    {/each}
</div>
<style>
    .server-panel {
        display: flex;
        background-color: var(--bg-3);
        flex-direction: column;
        margin: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }

    .server-head {
        background-color: var(--bg-1);
        font-weight: bold;
        margin: 0.1rem;
        padding: 0.3rem;
        border-radius: 0.2rem;
        display: flex;
        justify-content: space-between;
    }

    .server-item {
        background-color: var(--bg-1);
        margin: 0.2rem;
        padding: 0.3rem;
        border-radius: 0.2rem;
        display: flex;
        justify-content: space-between;
    }

    .server-label {
        font-weight: 400;
        text-wrap: nowrap;
    }

    @media (max-width: 620px) {
        .server-item {
            display: flex;
            flex-direction: column;
        }
        .server-message {
            font-size: 0.8rem;
            text-wrap: wrap;
            word-break: break-all;
        }
    }

</style>