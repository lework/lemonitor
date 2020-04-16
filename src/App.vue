<template>
  <div id="app">
    <div class="header">
      <div class="container">
        <span class="title"><a href="./">LE-Monitor</a></span>
        <span class="title-desc"> 开源软件的国内镜像站点</span>
      </div>
    </div>
    <div class="main">
      <a-spin tip="Loading..." :spinning="isLoading" style="margin: 20px">
        <div class="content">
          <a-back-top />
          <router-view />
        </div>
      </a-spin>
      <div class="footer">
        <p>
          <a href="https://github.com/lework/lemonitor/issues" target="_blank"
            >告诉我们</a
          >，我们可能会把它带给您！
        </p>
        <span
          >已稳定运行 <b>{{ runDay }}</b> 天！</span
        >
        leversion ©2020 Created by Lework
        <a href="https://github.com/lework/lemonitor" target="_blank">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
import { BackTop, Spin } from "ant-design-vue";
import { mapState } from "vuex";

export default {
  name: "app",
  data() {
    return {
      runDay: parseInt(
        (new Date().getTime() -
          new Date(Date.parse("2020-01-21".replace(/-/g, "/"))).getTime()) /
          1000 /
          3600 /
          24
      ),
      data: "",
      spinning: true
    };
  },
  components: {
    ABackTop: BackTop,
    ASpin: Spin
  },
  computed: {
    ...mapState(["isLoading"])
  }
};
</script>

<style lang="less" scoped>
@min-width: 1000px;

#app {
  width: 100%;
  height: 100%;
}

.header {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background: #fff;
}
.container {
  height: 100%;
  @media screen {
    @media (min-width: @min-width) {
      width: 1140px;
    }
  }
  margin: 0 auto;
  padding: 0 10px;
  border-bottom: 1px solid #dcdfe6;
}

.title {
  color: #409eff;
  font-size: 26px;
  font-weight: 500;
  font-family: "微软雅黑";
  @media screen {
    @media (max-width: @min-width) {
      padding-left: 5px;
    }
  }
}

.title-desc {
  color: rgba(0, 0, 0, 0.45);
  margin-left: 10px;
  font-size: 14px;
  @media screen {
    @media (max-width: @min-width) {
      font-size: 12px;
    }
  }
}

.main {
  position: relative;
  @media screen {
    @media (min-width: @min-width) {
      width: 1140px;
    }
  }
  height: -webkit-calc(100% - 80px);
  height: -moz-calc(100% - 80px);
  height: calc(100% - 80px);
  margin: 0 auto;
  padding: 10px 0;
  top: 80px;
}

.footer {
  text-align: center;
  line-height: 32px;
  padding: 20px 0;
  color: rgba(0, 0, 0, 0.45);
  @media screen {
    @media (max-width: @min-width) {
      font-size: 12px;
    }
  }
}
</style>
