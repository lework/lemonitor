/* eslint-disable no-prototype-builtins */
<template>
  <div>
    <div class="search">
      <a-input-search
        placeholder="输入软件名称或提供方"
        v-model="search_text"
        @search="onSearch"
        enterButton="搜索..."
      />
      <div class="tips">
        <router-link to="/usage">常见软件镜像设置</router-link>
      </div>
    </div>
    <div class="content">
      <a-spin :spinning="spinning">
        <a-list
          itemLayout="horizontal"
          :pagination="pagination"
          :dataSource="softwareList"
        >
          <div slot="header" class="list-header">
            <a-popover title="提供方列表" placement="rightTop">
              <template slot="content">
                <a-list
                  :grid="{ gutter: 16, column: 2 }"
                  :dataSource="Object.keys(providerData)"
                  style="width:240px"
                >
                  <a-list-item slot="renderItem" slot-scope="item">
                    <a target="_blank" :href="providerData[item]['url']"
                      >{{ item }}
                    </a>
                  </a-list-item>
                </a-list>
                <!-- <template v-for="tag in Object.keys(providerData)">
                  <p :key="tag">
                    <a target="_blank"
                       :href="providerData[tag]['url']">{{tag}} </a></p>
                </template> -->
              </template>
              <b>提供方: {{ Object.keys(providerData).length }} </b>
            </a-popover>
            <b>软件数目: {{ softwareList.length }}</b>
            <div class="header-switch"></div>
          </div>
          <a-list-item slot="renderItem" slot-scope="item" key="item">
            <a-list-item-meta>
              <div slot="title" class="list-title">{{ item }}</div>
              <div slot="description">
                <template v-for="tag in softwareData[item]">
                  <a-tag
                    :key="tag"
                    :color="providerData[tag]['tag_color']"
                    style="margin: 0 2px 2px;"
                  >
                    <a target="_blank" :href="providerData[tag]['url']"
                      >{{ tag }}
                    </a>
                  </a-tag>
                </template>
              </div>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-spin>
    </div>
  </div>
</template>

<script>
import { List, Tag, Input, Spin, Popover } from "ant-design-vue";

export default {
  name: "home",
  data() {
    return {
      runDay: parseInt(
        (new Date().getTime() -
          new Date(Date.parse("2020-01-21".replace(/-/g, "/"))).getTime()) /
          1000 /
          3600 /
          24
      ),
      monitorData: [],
      providerData: [],
      softwareList: [],
      softwareData: {},
      search_text: "",
      spinning: true,
      pagination: {
        pageSize: 10,
        size: "small",
        // eslint-disable-next-line no-unused-vars
        onChange: page => {
          document.querySelector("#app").scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    };
  },
  components: {
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    ATag: Tag,
    AInputSearch: Input.Search,
    ASpin: Spin,
    APopover: Popover
  },
  methods: {
    onSearch(value) {
      if (typeof value === "undefined" || value === null || value === "") {
        this._getData();
      } else {
        this._getData(value);
      }
    },
    _getData(search = "") {
      this.spinning = true;
      this.$axios
        .get("static/data/data.json")
        .then(rep => {
          this.monitorData = rep.data;
          this.providerData = {};
          this.softwareData = {};
          this.monitorData.forEach(e => {
            let name = e["name"];
            let color = e["tag_color"];
            let url = e["url"];
            this.providerData[name] = { tag_color: color, url: url };
            for (var i = 0; i < e["item"].length; i++) {
              e["item"][i] = e["item"][i].toLowerCase();
              let softwareName = e["item"][i];
              if (
                !Object.prototype.hasOwnProperty.call(
                  this.softwareData,
                  softwareName
                )
              ) {
                this.softwareData[softwareName] = [];
              }
              this.softwareData[softwareName].push(name);
            }
          });
          this.softwareList = Object.keys(this.softwareData);
          if (search !== "") {
            search = search.trim();
            let resultList = [];
            this.softwareList.forEach(e => {
              if (e.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                resultList.push(e);
              }
            });
            this.monitorData.forEach(e => {
              if (
                e["name"].toLowerCase().indexOf(search.toLowerCase()) !== -1
              ) {
                resultList = resultList.concat(e["item"]);
              }
            });
            this.softwareList = Array.from(new Set(resultList));
          }
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
  }
};
</script>

<style lang="less" scoped>
@min-width: 1000px;

.list-title {
  font-size: 16px;
  font-weight: bolder;
  font-family: "微软雅黑";
}

.search {
  @media screen {
    @media (min-width: @min-width) {
      width: 600px;
    }
    @media (max-width: @min-width) {
      font-size: 12px;
      padding: 50px 10px 20px;
    }
  }
  margin: 0 auto;
  text-align: center;
  padding: 50px 10px;
}
.content {
  width: 100%;
  padding: 0px 80px 20px 80px;
  @media screen {
    @media (max-width: @min-width) {
      padding: 0 20px 20px 20px;
    }
  }
}
.ant-list-item-meta-description {
  @media screen {
    @media (max-width: @min-width) {
      font-size: 12px;
    }
  }
  .tag-title {
    @media screen {
      @media (max-width: @min-width) {
        display: none;
      }
    }
  }
  .ant-tag {
    @media screen {
      @media (max-width: @min-width) {
        margin: 0;
      }
    }
  }
}
.tips {
  margin-top: 10px;
  font-size: 14px;
}
.tips-tag {
  @media screen {
    @media (max-width: @min-width) {
      font-size: 12px;
    }
  }
  margin-bottom: 5px;
}

.header-switch {
  float: right;
}

.list-header {
  @media screen {
    @media (max-width: @min-width) {
      font-size: 12px;
    }
  }
}
</style>
