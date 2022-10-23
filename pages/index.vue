<template>
  <div class="container">
    <div>
      <van-button
        type="default"
        class="btn-action"
        color="#495057"
        @click="handleTotem"
      >
        轮回
      </van-button>
      <van-button
        type="default"
        class="btn-action"
        color="#f03e3e"
        @click="handleFire"
      >
        燃烧
      </van-button>
      <van-button
        type="default"
        class="btn-action"
        color="#37b24d"
        @click="handleRebirth"
      >
        复活
      </van-button>
      <van-button
        type="default"
        class="btn-action"
        color="#1c7ed6"
        @click="handleSOS"
      >
        群攻
      </van-button>
      <van-button
        type="default"
        class="btn-action"
        color="#e9ecef"
        @click="handleHome"
      >
        回城
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
    },
    async handleRebirth () {
      await this.$axios.post('/api/rebirth')
    },
    async handleSOS () {
      await this.$axios.post('/api/sos')
    },
    async handleHome () {
      await this.$axios.post('/api/home')
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
