<template>
  <div>
    <div class="card-header wo-card-header app-modules">
      <label>Modules</label>
    </div>
    <div class="card-body wo-card-body app-modules">
      <div class="application-dialog" id="all-module" :class="{ 'active-card-select': selectAllModule,  disabled: isAllAppSelected }" @click="handleAllModuleSelection()">
        <h5 id="all-modules">All Modules</h5>
      </div>
      <ModulesSlider :applications="applications" :isSelectAllModule="selectAllModule"></ModulesSlider>
    </div>
</div>
</template>

<script>
import ModulesSlider from '@/components/ModulesSlider.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'applicationDetail',
  data () {
    return {
      selectAllModule: true,
      moduleName: '',
      isAllAppSelected: '',
      multiSelected: ''
    }
  },
  props: ['modules', 'applications'],
  methods: {
    handleAllModuleSelection () {
      var moduleText = this
      if ((this.isAllAppSelected && this.multiSelected) || !this.selectAllModule) {
        this.selectAllModule = !this.selectAllModule
        this.moduleList.forEach(function (module, index) {
          moduleText.$children[0].$children[0].$children[index].focusClass = false
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      moduleList: 'moduleList'
    })
  },
  components: {
    ModulesSlider
  },
  created () {
    this.$bus.$on('allModulesFlag', moduleFlag => {
      this.selectAllModule = !moduleFlag
    })
    this.$bus.$on('UpdateAppTitle', application => {
      this.moduleName = application.name
      this.selectAllModule = application.isSelected
    })
    this.$bus.$on('allAppSelected', allAppSelected => {
      this.isAllAppSelected = allAppSelected
      this.selectAllModule = !allAppSelected
    })
    this.$bus.$on('multiModuleSelected', multiModuleSelected => {
      this.multiSelected = multiModuleSelected
    })
  }
}
</script>
<style scoped>
    .wo-card-header.app-modules {
        font-size: 18px;
        font-weight: bold;
        text-align: left;
        color: #ffffff;
        background-color: #3a74b7
    }
    .wo-card-body.app-modules {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        color: #6e6e6e;
        width: 100%;
        background-color: #ffffff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.43);
        overflow: auto;
    }
    #all-modules {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        padding-top: 27px;
        cursor: pointer;
    }
    .application-dialog {
        height: 75px;
        background-color: #fbfbfb;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
    }
    .active-card-select {
      background: #3a74b7;
      color: #ffffff;
    }
</style>
