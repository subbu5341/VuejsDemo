<template>
   <div class="forum-container">
     <div class="forum-header">
       Community Forum <a href="" class="view-all pull-right">View All</a>
     </div>
     <div class="forum-body">
      <b-row>
          <b-col md="3" class="forum-logo-container">
            <img class="forum-logo" src="../assets/images/forum@3x.png"/>
          </b-col>
          <b-col>
            <div class="item-list">
              <div class="item" v-for="(topic,index) in forumTopicList" :key="index">
                <div class="item-title">{{topic.name}}</div>
                <div class="clearfix">
                  <div class="item-info col-8 pull-left">{{topic.description | truncate(70) }}</div>
                  <div class="text-right col-4 pull-right">
                    <a href="#" class="created-by">Created by {{topic.createdBy}}</a>
                  </div>
                </div>
                <div class="item-stat clearfix">
                  <div class="likes pull-left">
                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                    <span class="count">{{topic.likes}}</span>
                  </div>
                  <div class="comments pull-left">
                    <i class="fa fa-comment-o" aria-hidden="true"></i>
                    <span class="count">{{topic.replies}}</span>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
          
      </b-row>
     </div>
   </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  export default {
    name: 'forum',
    computed: {
      ...mapGetters({
        forumTopicList: 'forumTopicList'
      }),
      ...mapState([
        'route'
      ])
    },
    methods: {
      ...mapActions({
        getforumTopicList: 'getforumTopicList'
      }),
      fetchData () {
        return this.getforumTopicList()
      }
    },
    mounted () {
      this.fetchData()
    }
  }

</script>

<style scoped>
 .forum-container {
    margin-top: 15px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.43);
    height: 275px;
  }
  .forum-header {
    background-color: #4a90e2;
    padding: 10px 20px;
    font-weight: bold;
    color: #fff
  }
  .forum-header .view-all { color: #fff; }
  .forum-logo-container { text-align: center; }
  .forum-logo {
    width: 85%;
    max-width: 120px;
    margin: 30px 0;
  }
  .forum-body  { font-size: 14px; }
  .forum-body .item-title {
    font-size: 14px;
    font-weight: bold;
    color: #4990e2;
    margin-top: 10px;
  }
  .forum-body .item-info{
   font-size: 14px;
    text-align: left;
    color: #000000;
    padding: 0;
  }
  .forum-body .likes { margin-right: 15px; }
  .item-stat { margin-top: 5px; }
  .created-by {
    border-radius: 5px;
    color: #8b8b8b !important;
    font-size: 10px;
    padding: 3px 15px;
    display: inline-block;
    border: solid 1px rgba(0, 0, 0, 0.23);
    margin-right: 5px;
  }
  .view-all:hover, .created-by:hover { text-decoration: none; }
</style>