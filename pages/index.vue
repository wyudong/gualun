<template>
  <div>
    <vs-navbar center-collapsed>
      <template #left>
        <img src="favicon.ico">
      </template>
    </vs-navbar>

    <div class="container">
      <div class="row-wrapper">
        <vs-button
          border
          class="btn-action"
          :disabled="buttonDisabled"
          @click="handleTotem"
        >
          轮回
        </vs-button>
        <vs-switch v-model="autoToTem">
          自动
        </vs-switch>
      </div>
      <p class="hint">
        启用自动后，轮回 5 分钟一次
      </p>
      <div class="row-wrapper">
        <vs-button
          border
          class="btn-action"
          :disabled="buttonDisabled"
          @click="handleFire"
        >
          燃烧
        </vs-button>
        <vs-switch v-model="autoFire">
          自动
        </vs-switch>
      </div>
      <p class="hint">
        启用自动后，燃烧 30 分钟一次
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
        @click="handleTeleport"
      >
        瞬移
      </vs-button>
      <p class="hint">
        随机变换位置
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
      buttonDisabled: false,
      autoToTem: false,
      autoFire: false
    }
  },
  head () {
    return {
      title: '一天不练级就一天没长进'
    }
  },
  watch: {
    async autoToTem (status) {
      try {
        this.buttonDisabled = true
        await this.$axios.post('/api/totem/auto', {
          status
        })
        if (status) {
          this.openNotification('启用自动轮回')
        } else {
          this.openNotification('停用自动轮回')
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        this.openNotification('自动轮回出错')
      } finally {
        this.buttonDisabled = false
      }
    },
    async autoFire (status) {
      try {
        this.buttonDisabled = true
        await this.$axios.post('/api/fire/auto', {
          status
        })
        if (status) {
          this.openNotification('启用自动燃烧')
        } else {
          this.openNotification('停用自动燃烧')
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        this.openNotification('自动燃烧出错')
      } finally {
        this.buttonDisabled = false
      }
    }
  },
  created () {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('beforeunload', async () => {
      await fetch('/api/auto/disable', {
        method: 'POST',
        keepalive: true
      })
    })
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
    async handleTeleport () {
      try {
        this.buttonDisabled = true
        await this.$axios.post('/api/teleport')
        this.openNotification('瞬移成功')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        this.openNotification('瞬移失败')
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
        duration: 2000,
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
.row-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.hint {
  margin: 5px 0 15px;
  color: #495057;
  font-size: 12px;
}
.btn-action {
  margin-left: 20px;
  margin-right: 20px;
  padding: 0 20px;
}
.vs-input-content {
  margin: 10px 0px;
}
@media (max-width: 600px) {
  .vs-notification {
    padding: 20px !important;
  }
  .vs-notification__content__text p {
    font-size: 14px;
  }
}
</style>
