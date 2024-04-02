<script lang="ts">
    import { chatMessageStore } from '$lib/stores';
    let chatMessage: string = 'NaN';

    chatMessageStore.subscribe((data: { message: string }) => {
        chatMessage = data.message;
    });
</script>

<div class="chat-panel">
    <div class="chat-item">
        <span class="chat-label">Chat Message:&nbsp;</span>
        <span class="chat-value">{chatMessage}</span>
    </div>
</div>

<style>
    .chat-panel {
        display: flex;
        background-color: var(--bg-3);
        flex-direction: column;
        margin: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }

    .chat-item {
        background-color: var(--bg-1);
        margin: 0.1rem;
        padding: 0.3rem;
        border-radius: 0.2rem;
        display: flex;
        justify-content: space-between;
    }

    .chat-label {
        font-weight: bold;
    }

    .chat-value {
        word-break: word-break;
        font-style: italic;
    }
    @media (max-width: 750px) {
        .chat-item {
            display: flex;
            flex-direction: column;
        }
        .chat-value {
            font-size: 0.8rem;
            text-wrap: wrap;
            word-break: break-all;
        }
    }
</style>