<template>
  <div>
    <vs-navbar center-collapsed>
      <template #left>
        <img style="width: 16px;" src="icon32.png">
      </template>
      <template #right>
        <vs-button
          size="mini"
          style="margin-right: 17px;"
          flat
          @click="dialogPayment = !dialogPayment"
        >
          微信支付
        </vs-button>
        <img style="width: 16px;" src="meso.png">
        <span class="pricing">每小时 3.5 元或 1e 枫</span>
      </template>
    </vs-navbar>

    <div class="container">
      <vs-input
        v-model="accessCode"
        class="code-input"
        type="password"
        placeholder="输入 3 位数代码"
        :state="accessCodeState"
      />
      <hr>
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
          <template #off>
            自动／关
          </template>
          <template #on>
            自动／开
          </template>
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
          <template #off>
            自动／关
          </template>
          <template #on>
            自动／开
          </template>
        </vs-switch>
        <div class="fire-status">
          <img :src="fireStatus">
        </div>
      </div>
      <p class="hint">
        启用自动后，燃烧 30 分钟一次（慎用！）
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
        回城后顺便取消自动或关闭网页，不然一直放轮显得我很傻
      </p>
      <vs-button
        border
        warn
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleRebirth"
      >
        复活
      </vs-button>
      <p class="hint">
        如果我死了，请使用该项功能
      </p>
      <vs-button
        border
        warn
        class="btn-action"
        :disabled="buttonDisabled"
        @click="dialogChannel = !dialogChannel"
      >
        换线
      </vs-button>
      <p class="hint">
        从频道 A 移动到频道 B
      </p>
      <vs-button
        border
        warn
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleSOS"
      >
        群攻
      </vs-button>
      <p class="hint">
        当黑王靠近我后，才推荐施放（60 秒 CD）
      </p>
      <vs-button
        border
        warn
        class="btn-action"
        :disabled="buttonDisabled"
        @click="handleTeleport"
      >
        瞬移
      </vs-button>
      <p class="hint">
        随机变换位置（12 秒 CD）
      </p>

      <!-- payment dialog -->
      <vs-dialog
        v-model="dialogPayment"
        auto-width
        not-padding
        blur
      >
        <div class="dialog-payment">
          <img src="payment.png" alt="wechat-payment-qr">
        </div>
      </vs-dialog>

      <!-- channel dialog -->
      <vs-dialog
        v-model="dialogChannel"
        blur
      >
        <template #header>
          <h4>分别输入频道数字</h4>
        </template>
        <div class="dialog-form">
          <vs-input
            v-model="fromChannel"
            warn
            placeholder="起点频道"
          />
          <vs-input
            v-model="toChannel"
            warn
            placeholder="终点频道"
          />
        </div>
        <template #footer>
          <div class="dialog-footer">
            <vs-button
              warn
              class="btn-action"
              :disabled="buttonDisabled"
              @click="handleSwitchChannel"
            >
              移动
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      accessCode: '',
      accessCodeState: 'dark',
      buttonDisabled: false,
      autoToTem: false,
      autoFire: false,
      fireStatus: null,
      dialogPayment: false,
      dialogChannel: false,
      fromChannel: '',
      toChannel: ''
    }
  },
  head () {
    return {
      title: '一天不练级就一天没长进'
    }
  },
  watch: {
    accessCode (code) {
      if (code.length === 3) {
        this.debounceCheckCode()
      } else {
        this.accessCodeState = 'dark'
      }
    },
    async autoToTem (status) {
      try {
        this.buttonDisabled = true
        await this.postApi('/api/auto/totem', { status })
        if (status) {
          this.openNotification('启用自动轮回')
        } else {
          this.openNotification('停用自动轮回')
        }
      } catch (e) {
        console.log(e)
        this.openNotification('自动轮回出错', { type: 'error' })
      } finally {
        this.buttonDisabled = false
      }
    },
    async autoFire (status) {
      try {
        this.buttonDisabled = true
        await this.postApi('/api/auto/fire', { status })
        if (status) {
          this.openNotification('启用自动燃烧')
        } else {
          this.openNotification('停用自动燃烧')
        }
      } catch (e) {
        console.log(e)
        this.openNotification('自动燃烧出错', { type: 'error' })
      } finally {
        this.buttonDisabled = false
      }
    }
  },
  created () {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('beforeunload', async () => {
      await fetch('/api/auto/off', {
        method: 'POST',
        keepalive: true
      })
    })

    // check fire cooldown every minute
    setInterval(async () => {
      const d = new Date()
      const s = d.getSeconds()
      if (s < 10) {
        await this.fetchFireStatus()
      }
    }, 1000 * 10)
  },
  methods: {
    async getApi (url) {
      return await this.$axios.get(url, { headers: { 'x-access': this.accessCode } })
    },
    async postApi (url, data) {
      return await this.$axios.post(url, data, { headers: { 'x-access': this.accessCode } })
    },
    debounceCheckCode () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(async () => {
        try {
          await this.getApi('api/ping')
          this.accessCodeState = 'success'
        } catch (e) {
          this.accessCodeState = 'danger'
        }
      }, 300)
    },
    async handleTotem () {
      try {
        this.buttonDisabled = true
        await this.postApi('/api/totem', null)
        this.openNotification('轮回放置成功')
      } catch (e) {
        console.log(e)
        this.openNotification('轮回放置失败', { type: 'error' })
      } finally {
        this.buttonDisabled = false
      }
    },
    async handleFire () {
      try {
        this.buttonDisabled = true
        await this.postApi('/api/fire', null)
        setTimeout(async () => {
          await this.fetchFireStatus()
        }, 3000)
        this.openNotification('烧来了')
      } catch (e) {
        console.log(e)
        this.openNotification('烧没好', { type: 'error' })
      } finally {
        this.buttonDisabled = false
      }
    },
    async handleRebirth () {
      try {
        this.buttonDisabled = true
        await this.postApi('/api/rebirth', null)
        this.openNotification('我起死回生')
      } catch (e) {
        console.log(e)
        this.openNotification('你见死不救', { type: 'error' })
      } finally {
        this.buttonDisabled = false
      }
    },
    async handleTeleport () {
      try {
        this.buttonDisabled = true
        await this.postApi('/api/teleport', null)
        this.openNotification('瞬移成功')
      } catch (e) {
        console.log(e)
        this.openNotification('瞬移失败', { type: 'error' })
      } finally {
        this.buttonDisabled = false
      }
    },
    async handleSOS () {
      try {
        this.buttonDisabled = true
        await this.postApi('/api/sos', null)
        this.openNotification('全屏清怪启动')
      } catch (e) {
        console.log(e)
        this.openNotification('技能还没有准备好', { type: 'error' })
      } finally {
        this.buttonDisabled = false
      }
    },
    async handleHome () {
      try {
        this.buttonDisabled = true
        await this.postApi('/api/home', null)
        this.openNotification('收工回家')
      } catch (e) {
        console.log(e)
        this.openNotification('下班也回不了家', { type: 'error' })
      } finally {
        this.buttonDisabled = false
      }
    },
    async handleSwitchChannel () {
      try {
        this.buttonDisabled = true
        await this.postApi('/api/channel',
          {
            from: this.fromChannel,
            to: this.toChannel
          })
        this.openNotification('有缘千里来相会')
      } catch (e) {
        console.log(e)
        this.openNotification('无缘对面不相逢', { type: 'error' })
      } finally {
        this.buttonDisabled = false
      }
    },
    async fetchFireStatus () {
      try {
        const res = await this.getApi('/api/fire/status')
        const { data } = res
        this.fireStatus = `data:image/png;base64,${data}`
      } catch (e) {}
    },
    openNotification (text, options = {}) {
      const { type, duration, progress } = options
      const title = type === 'error' ? '😢 很遗憾' : '🥳 一切就绪'
      this.$vs.notification({
        progress,
        position: 'top-right',
        color: '#090909',
        duration: duration || 2000,
        title,
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
  margin-top: 20px;
  padding: 20px;
  background: #212529;
}
.code-input .vs-input {
  width: 118px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
}
hr {
  border: 0;
  height: 1px;
  width: 80%;
  background-image: linear-gradient(to right, rgba(64, 64, 64, 0), rgba(64, 64, 64, 0.75), rgba(64, 64, 64, 0));
}
.row-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.vs-switch {
  background: #868e96;
}
.fire-status {
  position: absolute;
  left: -30px;
  top: 6px;
}
.fire-status img {
  image-rendering: pixelated;
}
.pricing {
  margin: 0 7px;
  color: #868e96;
  font-size: 12px;
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
.vs-dialog {
  background: #e8e8e8;
  min-width: 300px;
}
.dialog-form {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.dialog-payment img {
  display: block;
  position: relative;
  max-width: 300px;
}
</style>
