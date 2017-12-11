<template>
  <div>
  <div class="card-header wo-card-header applications">
      <label>Applications</label>
      <span class="add-application"><i class="fa fa-plus-circle" aria-hidden="true"></i>
      </span>
  </div>
  <div class="card-body wo-card-body applications" v-if="applications && applications.length > 0">
    <div v-bind:class="{ selected: allApplicationFocus}" class="application-dialog" @click="allApplicationSelect()">
      <h5 id="all-classification">All Applications</h5>
    </div>
    <a v-for="applicationCard in applications" :key="applicationCard._id" @click="applicationSelected(applicationCard)">
      <applicationCard :organizationId="organizationId" :application="applicationCard" :allApplicationFocusFlag="allApplicationFocus"></applicationCard>
    </a>
  </div>
  <div class="card-body wo-card-body applications no-applications text-center" v-if="applications && applications.length === 0">
    <span>No application has been added yet!</span>
  </div>

</div>
</template>

<script>
import applicationCard from './application-card.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'applicationList',
  props: ['applications', 'organizationId'],
  data () {
    return {
      allApplicationFocus: false
    }
  },
  methods: {
    allApplicationSelect () {
      if (this.applications.length > 1) {
        this.allApplicationFocus = !this.allApplicationFocus
        this.$bus.$emit('allAppSelected', this.allApplicationFocus)
        this.applications.forEach(function (application, index) {
          this.$children[index].focusClass = this.allApplicationFocus
          application.isSelected = this.allApplicationFocus
        }, this)
      } else if (!this.allApplicationFocus) {
        this.$children[0].focusClass = true
        this.applications[0].isSelected = true
      }
    },
    applicationSelected (selectedApplicationCard) {
      selectedApplicationCard.isSelected = !selectedApplicationCard.isSelected
      if (this.allApplicationFocus) {
        if (this.selectedAppLength() !== this.applicationsList.length) {
          this.allApplicationFocus = false
        }
      } else if (!this.allApplicationFocus) {
        var el = this.$el.getElementsByClassName('active-app')
        if (this.applicationsList.length === el.length) {
          this.allApplicationFocus = true
        } else if (this.selectedAppLength() < 1) {
          this.$children[0].focusClass = true
          this.applications[0].isSelected = true
        }
      }
      if (this.selectedAppLength() > 1) {
        if (document.getElementsByClassName('active-card-select')[0]) {
          document.getElementsByClassName('active-card-select')[0].classList.remove('active-card-select')
        }
      } else if (this.selectedAppLength() === 1) {
        document.getElementById('all-module').classList.add('active-card-select')
      }
    },
    selectedAppLength () {
      return this.applications.filter(function (application) {
        return application.isSelected
      }).length
    }
  },
  computed: {
    ...mapGetters({
      applicationsList: 'applicationsList'
    })
  },
  components: {
    applicationCard: applicationCard
  }
}

</script>
<style scoped>
  .add-application {
    font-size: 20px;
    text-align: center;
    color: #ffffff;
    float: right;
  }
  .application-dialog {
    height: 75px;
    border-radius: 3px;
    background-color: #fbfbfb;
    color: #000000;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
  }
  #all-classification {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding-top: 27px;
    cursor: pointer;
  }
  .wo-card-header.applications {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    color: #ffffff;
    background-color: #3a74b7
  }
  .wo-card-body.applications {
    background-color: #dce0e9;
    height: calc(100vh - 76px);
    overflow: auto;
  }
  .no-applications > span {
    line-height: 70vh;
    font-weight: bold;
    color: #808080;
  }
  .selected {
    background: #3a74b7;
    color: #ffffff;
  }
  .application-text {
    margin: 200px 0px 0px 30px;
    font-size: 15px;
  }
</style>
