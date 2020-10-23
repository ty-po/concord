<template>
  <div class="home">
    <Status msg="Spotify Status:"/>
    <Transport msg="Controls:"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Status from '@/components/Status.vue';
import Transport from '@/components/Transport.vue';

export default {
  name: 'home',
  components: {
    Status,
    Transport,
  },
};
</script>
