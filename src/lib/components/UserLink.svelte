<script lang="ts">
  export let icon = 'default';
  export let title = 'title';
  export let url = 'url';
</script>

<a href={url} class="flex justify-center item-center">
  <img src={`/${icon}.png`} alt={icon} width="32" height="32" class="p-1" />
  <p class="w-5/6 text-center"><span>@{title}</span></p>
</a>
