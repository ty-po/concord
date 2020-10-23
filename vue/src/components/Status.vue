<template>
  <div class="status">
    <p>{{ msg }}</p>
    <p>{{ name }}</p>
    <p>{{ artist }}</p>
    <img :src="artwork">
  </div>
</template>

<script>
export default {
  name: 'Status',
  props: {
    msg: String,
  },
  computed: {
    name() {
      return this.$store.state.player.item.name;
    },
    artist() {
      return this.$store.state.player.item.artists[0].name;
    },
    artwork() {
      return this.$store.state.player.item.album.images[0].url;
    },
    length() {
      return this.$store.state.player.item.duration_ms / 1000;
    },
    progress() {
      return this.$store.state.player.progress_ms / 1000;
    },
    device() {
      return this.$store.state.player.device.name;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
