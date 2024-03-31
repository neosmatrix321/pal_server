<script lang="ts">
    import { chatMessageStore } from '$lib/stores';
    let chatMessage: string = 'NaN';

    chatMessageStore.subscribe((data: { message: string }) => {
        chatMessage = data.message;
    });
</script>

<div class="darker display_flex_col max_content">
    <div class="lighter display_flex_col max_content margin_double" style="min-width:200px;">
        <div class="darker display_flex_row nowrap max_content padding_double">
            {chatMessage}
        </div>
    </div>
</div>