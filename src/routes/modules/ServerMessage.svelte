<script lang="ts">
	import { serverMessageStore } from "$lib/stores";

    let serverMessage: string = 'No server message available.';

    serverMessageStore.subscribe((data: { message: string }) => {
        serverMessage = data.message;
    });

</script>

<div class="darker display_flex_col max_content">
    <div class="lighter display_flex_col max_content margin_double" style="min-width:200px;">
        <div class="darker display_flex_row nowrap max_content padding_double">
            {serverMessage}
        </div>
    </div>
</div>