<template>
  <div class="home">
    <LoginButtons provider="spotify"/>
    <LoginButtons provider="discord"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginButtons from '@/components/LoginButtons.vue';

export default {
  name: 'home',
  components: {
    LoginButtons,
  },
};
</script>
