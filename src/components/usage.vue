<template>
  <div class="usage-content">
    <a-spin :spinning="spinning">
      <vue-markdown :source="data"></vue-markdown>
    </a-spin>
  </div>
</template>

<script>
import { Spin } from 'ant-design-vue'
import VueMarkdown from 'vue-markdown'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const highlightCode = () => {
  const preEl = document.querySelectorAll('pre')
  const codeEl = document.querySelectorAll('code')
  preEl.forEach((el) => {
    hljs.highlightBlock(el)
  })
  codeEl.forEach((el) => {
    hljs.highlightBlock(el)
  })
}
export default {
  name: 'usage',
  data () {
    return {
      data: '',
      spinning: true
    }
  },
  components: {
    ASpin: Spin,
    VueMarkdown
  },
  computed: {},
  watch: {},
  methods: {
    _getData () {
      this.spinning = true
      this.$axios
        .get('static/data/mirrors.md')
        .then(rep => {
          this.data = rep.data
          this.spinning = false
        })
        .catch(e => {
          this.$message.error('获取数据失败!')
          console.log(e)
        })
    }
  },
  mounted () {
    this._getData()
    highlightCode()
  },
  beforeDestroy () { },
  updated () {
    highlightCode()
  }
}
</script>

<style lang="less" scoped>
@min-width: 1000px;

.usage-content {
  font-size: 14px;
  width: 100%;
  padding: 0px 80px 20px 80px;
  @media screen {
    @media (max-width: @min-width) {
      padding:  0 10px 10px 10px;
    }
  }
}

</style>
