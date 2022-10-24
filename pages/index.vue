<template>
  <div>
    <vs-navbar center-collapsed>
      <template #left>
        <img src="favicon.ico">
      </template>
    </vs-navbar>

    <div class="container">
      <vs-button
        border
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleTotem"
      >
        轮回
      </vs-button>
      <p class="hint">
        轮回 10 分钟后失效，需要手动再次放置
      </p>
      <vs-button
        border
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleFire"
      >
        燃烧
      </vs-button>
      <p class="hint">
        燃烧有 20% 的机率碰到无冷
      </p>
      <vs-button
        border
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleRebirth"
      >
        复活
      </vs-button>
      <p class="hint">
        如果我死了，烦请使用该项功能
      </p>
      <vs-button
        border
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleSOS"
      >
        群攻
      </vs-button>
      <p class="hint">
        当黑王靠近我后，才推荐施放
      </p>
      <vs-button
        border
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleHome"
      >
        回城
      </vs-button>
      <p class="hint">
        练级结束把我传回安全区
      </p>
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
        color: '#090909',
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
.vs-navbar-content {
  background: #212529 !important;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: #212529;
}
.hint {
  margin: 5px 0 15px;
  color: #495057;
  font-size: 12px;
}
.btn-action {
  padding: 0 20px;
}
</style>
