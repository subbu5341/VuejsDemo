<template>
  <!--Grid View element-->
  <b-card class="org-card" v-if="isGridView" @click="reDirectTo()" :key="orgObj._id">
    <div class="org-card-body">
      <div class="org-card-status">
        <span :class="['circle', orgObj.status.toLowerCase(), 'float-left']"></span> <span class="organization-name" > {{orgObj.name}}</span>
        <div class="action pull-right">
          <a href="#"><i class="fa fa-pencil"></i></a><a href="#"><i class="fa fa-trash-o"></i></a>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="org-card-logo" v-if="orgObj.logoId"  v-b-tooltip :title="orgObj.name">
        <img :src="getImage(orgObj.logoId)" alt="">
      </div>
      <div :class="['org-card-logo', {'placeholder': !orgObj.logoId}]" v-else v-b-tooltip :title="orgObj.name">logo</div> <!-- placeholder -->
      
    </div>
    <div class="org-card-footer">      
      <div class="org-card-footer-counts">
        <span class="org-card-apps-mails float-left">Apps {{this.orgObj.applicationCount}}</span>
        <span class="org-card-apps-mails float-right">
          <i class="fa fa-envelope" aria-hidden="true"></i> {{this.orgObj.messageCount}}
        </span>
      </div>
    </div>
  </b-card>
  <!-- Grid View element End -->
  <!--List View element-->
  <b-row class="org-card list-item" v-else @click="reDirectTo()" :key="orgObj._id">
    <b-col md="1"><span :class="['circle', orgObj.status.toLowerCase()]"></span></b-col>
    <b-col><span class="organization-name" v-b-tooltip :title="this.orgObj.name"> {{orgObj.name}}</span></b-col>
    <b-col md="1" class="text-center" >{{orgObj.applicationCount}}</b-col>
    <b-col md="2" class="text-center">{{orgObj.messageCount}}</b-col>
    <b-col md="1">
      <div class="action text-center">
        <a href="#"><i class="fa fa-pencil"></i></a><a href="#"><i class="fa fa-trash-o"></i></a>
      </div>
      </b-col>
  </b-row>
  <!-- List View element End -->
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'organizationsCard',
    props: ['orgObj', 'isGridView'],
    computed: {
      baseURL () {
        return axios.defaults.baseURL
      }
    },
    methods: {
      reDirectTo () {
        this.$router.push({ name: 'Organization', params: { id: this.orgObj._id } })
      },
      getImage (logoId) {
        return this.baseURL + '/uploads/' + logoId + '/image'
      }
    }
  }
</script>

<style scoped>
  
  .action  {
    position: relative;
    top: -8px;
    display: inline-block;
  }
  .org-container.list-view .action {
    top: 0px;
  }
  .action a:first-child { margin-right: 10px; }  
  .action .fa{
    color: #4990e2;
    display: none;
  }
  .org-card:hover .action .fa{
    display: inline-block;
  }
  .circle {
    width: 10px;
    height: 10px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    display: inline-block;
  }
  .org-container.list-view .circle{
    margin-left: 15px;
  }
  .circle.green { background: #7ed321; }
  .circle.yellow { background: #d9c565; }
  .circle.red { background: #903f1c; }

  .org-card {
    background-color: #fff;
  }

  .org-card:hover{
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.43);
    cursor: pointer;
  }
  .org-card-logo {
    width: 64px;
    height: 50px;
    font-size: 10px;
    text-align: center;
    color: #a6a6a6;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .org-card-logo.placeholder {
    border: 1px dashed #979797;
    font-size: 10px;
    text-align: center;
    color: #a6a6a6;
    padding-top: 16px;

  }
  .org-card-logo img {
    width: 64px;
  }

  .org-card .card-body {
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 0;
  }

  .org-card-body {
    background-color: #f8f8f8 !important;
    height: 142px;
    position: relative;
  }

  .org-card-status {
    padding: 1rem;
  }

  .organization-name {
    font-size: 16px;
    color: #000000;
    position: relative;
    padding-left: 8px;
    top: -8px;
  }
  .org-container.list-view .organization-name {
    top: 0;
    padding-left: 0px;
  }

  .org-card-apps-mails {
    font-size: 14px;
    color: #9b9b9b;
    padding-top:12px;
  }

  .org-card-footer{
    height: 48px;
  }
</style>