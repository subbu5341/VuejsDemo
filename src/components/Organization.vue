<template>
  <b-container fluid>
    <b-row>
      <b-col md="4" class="master-block">
        <applicationList :organizationId="organizationId" :applications="applicationsList"></applicationList>
      </b-col>
      <b-col md="8" v-if="applicationsList.length > 0">
        <applicationDetail :applications="applicationsList"></applicationDetail>
        <moduleBoard></moduleBoard>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import applicationList from '@/components/Applications-list.vue'
import applicationDetail from '@/components/application-detail.vue'
import moduleBoard from '@/components/module-board.vue'

export default {
  name: 'Organization',
  data () {
    return {
      organizationId: ''
    }
  },
  methods: {
    ...mapActions({
      getApplications: 'getApplications',
      getModule: 'getModule'
    }),
    fetchData (organizationId) {
      var applicationContext = this
      this.getApplications(organizationId)
      .then((response) => {
        if (applicationContext.applicationsList.length > 0) {
          var applicationId = applicationContext.applicationsList[0]._id
          applicationContext.getModule({applicationId, organizationId})
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      applicationsList: 'applicationsList'
    })
  },
  components: {
    applicationList: applicationList,
    applicationDetail,
    moduleBoard
  },
  mounted () {
    this.organizationId = this.$route.params.id
    this.fetchData(this.$route.params.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .master-block {
    margin-bottom: 16px;
  }
  .container-fluid {
    background-color: #edf0f4;
  }
</style>
