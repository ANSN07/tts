<script lang="ts">
  import type { PageData } from "./$types";
  import Wall from "$lib/ui/learning-objects/layout/Wall.svelte";
  export let data: PageData;
</script>

<Wall los={data.los} type={data.type} />
