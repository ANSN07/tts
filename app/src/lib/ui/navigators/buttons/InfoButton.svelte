<script lang="ts">
  import Icon from "$lib/ui/icons/Icon.svelte";
  import { getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
  const drawerStore = getDrawerStore();
  const infoDrawerOpen: any = () => {
    const settings: DrawerSettings = { id: "info", position: "left" };
    drawerStore.open(settings);
  };
</script>

<button class="btn btn-sm" on:click={infoDrawerOpen}>
  <Icon tip={"View course info"} icon="fluent:info-28-regular" color="rgba(var(--color-primary-500))" height="20" />
</button>
