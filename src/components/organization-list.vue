<template>
  <div class="organization-master">
    <b-card no-body header-tag="header" header-bg-variant="primary" header-text-variant="white">
      <div slot="header" class="mb-0">
        <span class="float-left title">Organizations</span>
        <div class="pull-right">
          <span class="pull-left cursor-pointer add-org" v-b-modal.org-modal>
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
            <span>Organization</span>
          </span>
          <div class="pull-left sort-by">
            <span class="text">Sort:</span>
            <b-dropdown :text="sortList[sortBy]" right>
              <b-dropdown-item @click="onSort(index)" v-for="(sortItem,index) in sortList" :key="index"  href="#">{{sortItem}}</b-dropdown-item>
            </b-dropdown>
          </div>
          <span class="pull-left toggle-view cursor-pointer">
              <i :class="['fa', orgDispToggle ? 'fa-th-list' : 'fa-th-large']" @click="orgDispToggle =!orgDispToggle" aria-hidden="true"></i>
          </span>
        </div>
        <organisation-modal></organisation-modal>
      </div>
      
      <div :class="['org-container', {'list-view': !orgDispToggle} ]" >
          <!--Grid View-->
          <div class="organization-body" v-if="orgDispToggle">
            <b-card-group deck>
              <template v-for="(org,index) in organizationList">
                <div style="flex: 1 0 100%" v-if="index % 3 === 0" :key="index"></div>
                <organizations-card :orgObj="org" :isGridView="orgDispToggle" :key="index"></organizations-card>
              </template>
            </b-card-group>
          </div>
          <!--Grid View End-->
          <!--List View -->
          <b-container fluid v-if="!orgDispToggle">
            <b-row class="list-header">
              <b-col md="1">Status</b-col>
              <b-col md="7">Name</b-col>
              <b-col md="1" class="text-center" >Apps</b-col>
              <b-col md="2" class="text-center">Messages</b-col>
            </b-row>
            <div class="organization-body">
                <organizations-card v-for="(org,index) in organizationList" :orgObj="org" :isGridView="orgDispToggle" :key="index"></organizations-card>
            </div>
          </b-container>

          <!--List View End-->
      </div>
    </b-card>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  import organizationsCard from './organizations-card.vue'
  import organisationModal from './organisation-modal'
  export default {
    name: 'organizationList',
    data () {
      return {
        orgDispToggle: true,
        sortList: ['Name', 'Created', 'Modified'],
        sortBy: 0 // index of selected item in the 'sortList'
      }
    },
    computed: {
      ...mapGetters({
        organizationList: 'organizationList'
      }),
      ...mapState([
        'route'
      ])
    },
    methods: {
      ...mapActions({
        getOrganizationsList: 'getOrganizationsList',
        sortByName: 'sortByName',
        sortByCreatedDate: 'sortByCreatedDate',
        sortByUpdatedDate: 'sortByUpdatedDate'
      }),
      fetchData () {
        return this.getOrganizationsList()
      },
      onSort (index) {
        let sort = this.sortList[ this.sortBy = index ]
        if (sort === 'Name') {
          this.sortByName()
        } else if (sort === 'Created') {
          this.sortByCreatedDate()
        } else if (sort === 'Modified') {
          this.sortByUpdatedDate()
        }
      }
    },
    components: {
      organizationsCard: organizationsCard,
      organisationModal
    },
    mounted () {
      this.fetchData()
    }
  }
</script>

<!-- to override style of vue bootstrap component -->
<style>
  .sort-by button.btn-secondary {
    background: none;
    border: none;
    padding: 0;
    font-size: 14px;
    font-weight: bold;
    position: relative;
    top: -2px;
  }
  .sort-by button.btn-secondary:active { box-shadow:none; }
  .card-header { padding: 0.35rem 1.25rem; }
  .sort-by button.dropdown-toggle { background: none !important; }
  .dropdown-item { font-size: 14px; }
  .dropdown-item:active { background-color: #4a90e2; }
</style>

<style scoped>
  .organization-master .bg-primary {
    background-color: #4a90e2 !important;
  }
  .add-org {
    font-size: 14px;
    border-radius: 3px;
    background-color: #ffffff;
    color: #000;
    padding: 4px 12px;
    margin-top: 2px;
  }
  .card-deck .card { margin: 10px; }
  .toggle-view { margin:6px 0 0 20px; }
  .toggle-view i.fa { font-size: 18px; }
  .card { border: solid 1px #d8d8d8; }
  .card,
  .card-header {
    border-radius: 0 !important;
  }
  .card-header .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 2px;
  }
  .org-container {
    background-color: #f8f8f8 !important;
  }
  .org-container.list-view { padding: 0; }
  .sort-by {
    font-size: 14px;
    font-weight: bold;
    padding: 6px 20px 6px 20px;
    margin-left: 20px;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
  }
  .arrow-span {
    left: -20px;
    position: relative;
    z-index: 10000;
    pointer-events: none !important;
  }
  .cursor-pointer { cursor: pointer; }
  .list-header {
    font-size: 14px;
    font-weight: bold;
    background-color: #E9E9E9;
    border-bottom: 1px solid #d6d6d6;
    padding: 4px 0;
  }
  .organization-body {
    padding: 15px 25px;
    height: calc(100vh - 358px);
    overflow: auto;
  }
  .organization-master {
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.43);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.43);
  }
  .organization-master > .card {
    border: none;
  }
  .org-container.list-view  .organization-body  { padding: 0; }
  .org-container.list-view .list-item {
    font-size: 14px;
    padding: 6px 0;
  }
  .org-container.list-view .list-item:nth-child(odd) {
    background-color: #F5F5F5;
  }
  .org-container.list-view .organization-body {
    padding: 0px;
  }
  .org-container.list-view .container-fluid,
  .org-container.list-view .row {
    margin-right: 0px;
    margin-left: 0px; 
    padding-right: 0px;
    padding-left: 0px; 
  }
  .org-container.list-view .organization-body {
    height: calc(100vh - 388px);
  }
</style>