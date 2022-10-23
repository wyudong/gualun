<template>
  <div class="container">
    <div>
      <van-button
        type="default"
        class="btn-action"
        color="#f03e3e"
        @click="handleTotem"
      >
        轮
      </van-button>
      <van-button
        type="default"
        class="btn-action"
        color="#343a40"
        @click="handleFire"
      >
        烧
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    async handleTotem () {
      await this.$axios.post('/api/totem')
    },
    async handleFire () {
      await this.$axios.post('/api/fire')
    }
  },
  head () {
    return {
      title: '一天不练级就一天没长进'
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.btn-action {
  padding: 0 30px;
}
</style>
