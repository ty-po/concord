<template>
  <div class="home">
    <Status msg="param in here"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Status from '@/components/Status.vue';

export default {
  name: 'home',
  components: {
    Status,
  },
};
</script>
