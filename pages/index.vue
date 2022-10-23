<template>
  <div class="container">
    <div>
      <vs-button
        border
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleTotem"
      >
        轮回
      </vs-button>
      <vs-button
        border
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleFire"
      >
        燃烧
      </vs-button>
      <vs-button
        border
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleRebirth"
      >
        复活
      </vs-button>
      <vs-button
        border
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleSOS"
      >
        群攻
      </vs-button>
      <vs-button
        border
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleHome"
      >
        回城
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      buttonDisabled: false
    }
  },
  head () {
    return {
      title: '一天不练级就一天没长进'
    }
  },
  methods: {
    async handleTotem () {
      try {
        this.buttonDisabled = true
        await this.$axios.post('/api/totem')
        this.openNotification('轮回放置成功')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        this.openNotification('轮回放置失败')
      } finally {
        this.buttonDisabled = false
      }
    },
    async handleFire () {
      try {
        this.buttonDisabled = true
        await this.$axios.post('/api/fire')
        this.openNotification('烧来了')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        this.openNotification('烧出问题了')
      } finally {
        this.buttonDisabled = false
      }
    },
    async handleRebirth () {
      try {
        this.buttonDisabled = true
        await this.$axios.post('/api/rebirth')
        this.openNotification('起死回生？')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        this.openNotification('见死不救')
      } finally {
        this.buttonDisabled = false
      }
    },
    async handleSOS () {
      try {
        this.buttonDisabled = true
        await this.$axios.post('/api/sos')
        this.openNotification('全屏清怪启动')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        this.openNotification('没力气打怪了')
      } finally {
        this.buttonDisabled = false
      }
    },
    async handleHome () {
      try {
        this.buttonDisabled = true
        await this.$axios.post('/api/home')
        this.openNotification('收工回城')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        this.openNotification('下班也回不了家')
      } finally {
        this.buttonDisabled = false
      }
    },
    openNotification (text) {
      this.$vs.notification({
        position: 'top-right',
        duration: 1500,
        title: '🥳',
        text
      })
    }
  }
}
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #f5f7f8;
}
.btn-action {
  padding: 0 30px;
}
</style>
