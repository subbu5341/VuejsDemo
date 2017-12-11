<template>
  <b-row>
    <b-col>
      <div class="title">Statistics</div>
      <b-card class="text-center">
        <b-row>
          <b-col v-bind:class="{ 'col-12': moduleStatistics.length === 1, 'col-6': moduleStatistics.length >= 2 }" v-for="(statisticObj, index) of moduleStatistics" :key="index">
            <div class="st-master">
              <div class="st-name text-wrap"> {{statisticObj.name}} </div>
              <div class="st-graph">
                <vue-circle :id="getId()" :start-angle="vueCircleOptions.startingAngle" :progress="statisticObj.progress" :size="vueCircleOptions.size" :fill="{color:statisticObj.status}"></vue-circle>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import VueCircle from 'vue2-circle-progress'
  export default {
    name: 'applicationStatistics',
    props: ['moduleId'],
    data () {
      return {
        vueCircleOptions: {size: 80, startingAngle: -(Math.PI / 2)}
      }
    },
    computed: {
      ...mapGetters({
        moduleStatistics: 'moduleStatistics'
      })
    },
    methods: {
      ...mapActions({
        getModuleStatistics: 'getModuleStatistics'
      }),
      fetchData () {
        return this.getModuleStatistics(this.moduleId)
      },
      getId () {
        return '_' + Math.random().toString(36).substr(2, 9)
      }
    },
    components: {
      VueCircle
    },
    mounted () {
      this.fetchData()
    }
  }
</script>
<style scoped>
  .title {
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
  }
  .card {
    background-color: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(180, 180, 180, 0.5);
    border: solid 1px rgba(217, 217, 217, 0.33);
    border-radius: 0;
  }
  .st-name{
    padding-bottom: 15px;
  }
  .st-master{
    padding: 10px;
  }
  .text-wrap {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 96%;
    margin: 0;
    display: inline-block;
  }
</style>