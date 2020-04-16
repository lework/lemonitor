<template>
  <div class="usage-content">
    <a-spin :spinning="spinning">
      <div class="toc">
        目录
        <div id="toc" />
      </div>
      <div class="markdown">
        <vue-markdown :source="data" :toc="true" toc-id="toc"></vue-markdown>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { Spin } from "ant-design-vue";
import VueMarkdown from "vue-markdown";

import * as hljs from "highlight.js/lib/highlight";
import * as bash from "highlight.js/lib/languages/bash";
import * as xml from "highlight.js/lib/languages/xml";

import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("xml", xml);

const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");
  const codeEl = document.querySelectorAll("code");
  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
  codeEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};
export default {
  name: "usage",
  data() {
    return {
      data: "",
      spinning: true
    };
  },
  components: {
    ASpin: Spin,
    VueMarkdown
  },
  computed: {},
  watch: {},
  methods: {
    _getData() {
      this.spinning = true;
      this.$axios
        .get("static/data/mirrors.md")
        .then(rep => {
          this.data = rep.data;
          this.spinning = false;
        })
        .catch(e => {
          this.$message.error("获取数据失败!");
          console.log(e);
        });
    }
  },
  mounted() {
    this._getData();
    highlightCode();
  },
  beforeDestroy() {},
  updated() {
    highlightCode();
  }
};
</script>

<style lang="less">
@min-width: 1000px;

.usage-content {
  font-size: 14px;
  width: 100%;
  padding: 0px 80px 20px 80px;
  @media screen {
    @media (max-width: @min-width) {
      padding: 0 10px 10px 10px;
    }
  }
}
.toc {
  margin-left: -160px;
  position: fixed;
  @media screen {
    @media (max-width: @min-width) {
      position: relative;
      margin-left: 0px;
    }
  }
}
.markdown h2 {
  padding-top: 90px;
  margin-top: -90px;
}
</style>
