<template>
  <div class="module-card" :class="{'active-module' : focusClass }" @click="highlightCard(moduleData)">
    <div class="module-card-header" v-bind:class="{ disabled: isMultiSelect}">
      <b-row>
        <b-col cols="2">
          <span class="icon-align">
          <i v-if="moduleData.name === 'Classification'" class="fa fa-list-ul" aria-hidden="true"></i>
          <i v-if="moduleData.name === 'PIA'" class="fa fa-shield" aria-hidden="true"></i>
          <i v-if="moduleData.name === 'Consent Form'" class="fa fa-file-text-o" aria-hidden="true"></i>
          <i v-if="moduleData.name === 'Mapping'" class="fa fa-object-ungroup" aria-hidden="true"></i>
          </span>
        </b-col>
        <b-col cols="7">
          <span class="module-align">{{moduleData.name}}</span>
        </b-col>
        <b-col cols="3">
          <span class="module-icon"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
        </b-col>
      </b-row>
    </div>
    <div class="module-card-body">
      <b-row v-if="!isMultiSelect">
        <b-col cols="6" class="status">
          <span class="status-align status-text">{{moduleData.statusText}}</span>
        </b-col>
        <b-col cols="6" class="donut">
          <span>
            <vue-circle
              :id="getId()"
              :progress="moduleData.progress"
              :size="vueCircleOptions.size"
              :start-angle="vueCircleOptions.startingAngle"
              :fill="{color: moduleData.status}">
            </vue-circle>
          </span>
        </b-col>
      </b-row>
    </div>
    <div class="module-card-footer" v-bind:class="{ disabled: isMultiSelect}">
      <b-row>
        <b-col cols="4">
          <span class="module-icon"><i class="fa fa-tasks fa-footer" aria-hidden="true"></i>
          </span>
          <label class="count" v-if="!isMultiSelect">{{moduleData.taskCount}}</label>
           <label class="count" v-else="isMultiSelect">0</label>
        </b-col>
        <b-col cols="4">
          <span class="module-icon"><i class="fa fa-envelope-o fa-footer" aria-hidden="true"></i>
          </span>
          <label class="count" v-if="!isMultiSelect">{{moduleData.messageCount}}</label>
          <label class="count" v-else="isMultiSelect">0</label>
        </b-col>
        <b-col cols="4">
          <span class="module-icon"><i class="fa fa-exclamation-triangle fa-footer" aria-hidden="true"></i>
          </span>
          <label class="count" v-if="!isMultiSelect">{{moduleData.alertCount}}</label>
          <label class="count" v-else="isMultiSelect">0</label>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
  import VueCircle from 'vue2-circle-progress'
  import { mapGetters } from 'vuex'
  export default {
    name: 'ModuleCard',
    props: ['moduleData', 'isMultiSelect', 'isSelectAllModule'],
    components: { VueCircle },
    data () {
      return {
        fill: {},
        focusClass: false,
        vueCircleOptions: {size: 60, startingAngle: -(Math.PI / 2)}
      }
    },
    methods: {
      getId () {
        return '_' + Math.random().toString(36).substr(2, 9)
      },
      highlightCard (selectedModule) {
        if (!this.isMultiSelect) {
          var moduleContext = this
          this.moduleList.forEach(function (module, index) {
            if (selectedModule.name === module.name) {
              moduleContext.$parent.$children[index].focusClass = true
            } else {
              moduleContext.$parent.$children[index].focusClass = false
            }
          })
          this.isSelectAllModule = false
          this.$bus.$emit('allModulesFlag', this.focusClass)
        }
      }
    },
    created () {
      this.$bus.$on('allAppSelected', allAppSelected => {
        this.isMultiSelect = allAppSelected
      })
    },
    watch: {
      isMultiSelect: function (newVal) {
        if (newVal) {
          this.focusClass = !newVal
        }
      }
    },
    computed: {
      ...mapGetters({
        moduleList: 'moduleList'
      })
    }
  }
</script>

<style scoped>
    a.slick-slide {
        margin: 0 5px;
        color: #000000;
        outline:none;
    }
    .fa-footer {
       font-size: 14px;
    }
    .module-card {
        height: 200px;
        border-radius: 3px;
        background-color: #fbfbfb;
        margin-right: 11px;
        border: solid 1px #d9d9d9;
        margin-top: 16px;
    }
    .module-card:hover {
        border: solid 2px #808080;
        color: #000000 !important;
        text-decoration: none;
    }
    .module-card-header {
        background-color: #fbfbfb;
        height: 38px;
        padding-top: 8px;
        border-right: solid #e9eae9;
    }
    .module-card-body {
        height: 120px;
        background-color: #ffffff;
    }
    .module-card-footer {
        background-color: #fbfbfb;
        height: 38px;
        padding-top: 8px;
        border-right: solid #e9eae9;
    }
    .status {
        padding-top: 39px;
    }
    .donut {
        padding-top: 35px;
    }
    .percent-text {
        color: #000000;
    }
    .module-align {
        float: left;
        font-size: 14px;
        color: #4a4a4a;
    }
    label.count {
        margin-left: 5px;
        font-weight: 100;
        font-size: 14px;
    }
    .icon-align {
        margin-left: 14px;
    }
    .module-card.active-module {
        border: solid 2px #4990e2;
        color: #000000 !important;
        text-decoration: none;
    }
    .status-align {
        height: 17px;
        font-size: 15px;
        font-weight: bold;
        text-align: left;
        color: #000000;
    }
    .disabled {
      opacity: 0.2;
      pointer-events: none;
    }
    .donut > span {
      font-weight: 100;
      font-size: 14px;
    }
    .module-icon {
      color: #4a4a4a;
    }
</style>
