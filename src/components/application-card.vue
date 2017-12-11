<template>
  <div class="application-card" @click="handleCardSelection(application, organizationId, allApplicationFocusFlag)"
   :class="{ 'active-app': focusClass}">
    <div class="application-card-header">
      <b-row>
        <b-col cols="2">
          <span class="place-holder-app"><i class="fa fa-square-o" aria-hidden="true"></i></span>
        </b-col>
        <b-col cols="8">
          <span class="card-title-text pull-left">{{application.name}}</span>
        </b-col>
        <b-col cols="2">
          <span></span>
        </b-col>
      </b-row>
    </div>
    <div class="application-card-body">
      <b-row class="app-progress">
        <b-col cols="1"></b-col>
        <b-col cols="10">
          <progress-bar v-model="application.overallPercentage" color="#4990e2" border-color="#ffffff" background-color="#7fabd8" :height="15"></progress-bar>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
      <b-row class="app-progress">
        <b-col v-for="(item,index) in application.percentage" :key="item._id" class="circle donut">
          <vue-circle :id="getId()" :progress="item.progress" :size="vueCircleOptions.size" :start-angle="vueCircleOptions.startingAngle" :fill="{color:item.status}"></vue-circle>
          <span align="middle" class="circle-title">{{item.name}}</span>
        </b-col>
      </b-row>
    </div>
    <div class="application-card-footer">
      <b-row>
        <b-col cols="4">
          <span>
            <i class="fa fa-tasks" aria-hidden="true"></i>
          </span>
          <span class="card-footer-number">{{application.taskCount}}</span>
        </b-col>
        <b-col cols="4">
          <span>
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </span>
          <span class="card-footer-number">{{application.messageCount}}</span>
        </b-col>
        <b-col cols="4">
          <span>
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          </span>
          <span class="card-footer-number">{{application.alertCount}}</span>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
  import VueCircle from 'vue2-circle-progress'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'applicationCard',
    props: ['application', 'allApplicationFocusFlag', 'organizationId'],
    data () {
      return {
        focusClass: false,
        vueCircleOptions: {size: 50, startingAngle: -(Math.PI / 2)}
      }
    },
    methods: {
      ...mapActions({
        getModule: 'getModule'
      }),
      getId () {
        return '_' + Math.random().toString(36).substr(2, 9)
      },
      getModuleDetail (applicationId, organizationId) {
        this.getModule({applicationId, organizationId})
      },
      handleCardSelection (application, organizationId, allApplicationFlag) {
        this.focusClass = !this.focusClass
        this.getModuleDetail(application._id, organizationId)
        this.$bus.$emit('UpdateAppTitle', application)
      }
    },
    computed: {
      ...mapGetters({
        moduleList: 'moduleList',
        applicationsList: 'applicationsList'
      })
    },
    components: {
      VueCircle,
      'progress-bar': require('vue-progress-bar')
    },
    mounted () {
      var elem = this.$el.getElementsByClassName('progress-bar-label')
      elem[0].remove()
      this.$parent.$children[0].focusClass = true
      this.applicationsList[0].isSelected = true
    }
  }
</script>
<style scoped>
  .application-card {
    border-radius: 3px;
    background-color: #ffffff;
    margin-top: 15px;
  }
  .application-card.active-app {
    border: solid 2px #4990e2;
    box-shadow: 0px 0px 2px;
  }
  .application-card-header {
    background-color: #f7f7f7;
    padding: 5px;
  }
  .application-card-body {
    background-color: #ffffff;
    padding: 5px;
  }
  .application-card-footer {
    background-color: #f7f7f7;
    padding: 5px;
  }
  .card-footer-number {
    margin-left: 5px;
    line-height: 40px;
  }
  .card-title-text {
    font-weight: bold;
    text-align: left;
    line-height: 40px;
  }
  .app-progress {
    padding: 10px 5px;
  }
  .progress-bar {
    background-color: #ffffff;
  }
  div.progress-bar-label {
    display: none !important;
  }
  i.fa.fa-exclamation-triangle {
    margin-left: 50px;
  }
  i.fa.fa-envelope-o {
    margin-left: 30px;
  }
  i.fa.fa-tasks {
    margin-left: 10px;
  }
  .circle-title {
    font-size: 12px;
  }
  .circle {
    margin-left: -2px !important;
  }
  .application-card:hover {
    border: solid 1px #808080;
    box-shadow: 0px 0px 2px;
  }
  .donut  {
    font-weight: 100 !important;
    font-size: 14px !important;
  }
  .place-holder-app {
    font-size: 30px;
    margin-left: 30%;
  }
</style>
