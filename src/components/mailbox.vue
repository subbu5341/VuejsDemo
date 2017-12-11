<template>
    <div class="mail-box">
      <div class="mail-header">
        Messages
      </div>
      <div class="mail-body">
        <b-tabs pills>
          <b-tab title="All" active>
            <ul>
              <li v-for="(message,index) in allMessages" :key="index">
                <b-row>
                  <b-col col md="1" sm="1"><i class="fa fa-caret-right" aria-hidden="true"></i></b-col>
                  <b-col col md="8" sm="8">
                    <div class="title">{{message.organization.name}} <span class="activity">{{message.activity}}</span></div>
                    <div class="from"><span v-if="message.taskStatus" class="bold">{{message.taskStatus}}:</span> {{message.from}}</div>
                    <div class="message">{{message.subject}}:{{message.description | truncate(50)}}</div>
                  </b-col>
                  <b-col col md="3" sm="3" class="reply"><i v-if="message.taskStatus || message.activity" :class="message.taskStatus ? 'fa fa-share' : 'fa fa-reply'" aria-hidden="true"></i> <div class="date-time">{{message.lastUpdated}}</div></b-col>
              </b-row>
              </li>
            </ul>
          </b-tab>
          <b-tab title="<i class='fa fa-envelope-o'></i> Sent" >
            <ul>
              <li v-for="(message,index) in sentItem" :key="index">
                <b-row>
                  <b-col col  md="1" sm="1"><i class="fa fa-caret-right" aria-hidden="true"></i></b-col>
                  <b-col col md="8" sm="8">
                    <div class="title">{{message.organization.name}} <span class="activity">{{message.activity}}</span></div>
                    <div class="from"><span v-if="message.taskStatus" class="bold">{{message.taskStatus}}:</span> {{message.from}}</div>
                    <div class="message">{{message.subject}}:{{message.description | truncate(50)}}</div>
                  </b-col>
                  <b-col col md="3" sm="3" class="reply"><i v-if="message.taskStatus || message.activity" :class="message.taskStatus ? 'fa fa-share' : 'fa fa-reply'" aria-hidden="true"></i> <div class="date-time">{{message.lastUpdated}}</div></b-col>
              </b-row>
              </li>
            </ul>
          </b-tab>
          <b-tab title="<i class='fa fa-inbox'></i> Inbox">
            <ul>
              <li v-for="(message,index) in inboxItem" :key="index">
                <b-row>
                  <b-col  col md="1" sm="1"><i class="fa fa-caret-right" aria-hidden="true"></i></b-col>
                  <b-col col md="8" sm="8">
                    <div class="title">{{message.organization.name}} <span class="activity">{{message.activity}}</span></div>
                    <div class="from"><span v-if="message.taskStatus" class="bold">{{message.taskStatus}}:</span> {{message.from}}</div>
                    <div class="message">{{message.subject}}:{{message.description | truncate(50)}}</div>
                  </b-col>
                  <b-col col md="3" sm="3" class="reply"><i v-if="message.taskStatus || message.activity" :class="message.taskStatus ? 'fa fa-share' : 'fa fa-reply'" aria-hidden="true"></i> <div class="date-time">{{message.lastUpdated}}</div></b-col>
              </b-row>
              </li>
            </ul>
          </b-tab>
          <b-tab title="<i class='fa fa-share-square-o'></i> Outbox">
            <ul>
              <li v-for="(message,index) in outboxItem" :key="index">
                <b-row>
                  <b-col  col md="1" sm="1"><i class="fa fa-caret-right" aria-hidden="true"></i></b-col>
                  <b-col col md="8" sm="8">
                    <div class="title">{{message.organization.name}} <span class="activity">{{message.activity}}</span></div>
                    <div class="from"><span v-if="message.taskStatus" class="bold">{{message.taskStatus}}:</span> {{message.from}}</div>
                    <div class="message">{{message.subject}}:{{message.description | truncate(50)}}</div>
                  </b-col>
                  <b-col col md="3" sm="3" class="reply"><i v-if="message.taskStatus || message.activity" :class="message.taskStatus ? 'fa fa-share' : 'fa fa-reply'" aria-hidden="true"></i> <div class="date-time">{{message.lastUpdated}}</div></b-col>
                </b-row>
              </li>
            </ul>
          </b-tab>
        </b-tabs>
      </div>
    </div>
</template>
<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  export default {
    name: 'mailbox',
    computed: {
      ...mapGetters({
        messages: 'messages'
      }),
      ...mapState([
        'route'
      ]),
      allMessages () {
        return Object.keys(this.messages).map((key) => this.messages[key])
      },
      inboxItem () {
        return this.filterBy('inbox')
      },
      outboxItem () {
        return this.filterBy('outbox')
      },
      sentItem () {
        return this.filterBy('sent')
      }
    },
    methods: {
      ...mapActions({
        getMessages: 'getMessages'
      }),
      filterBy (type) {
        return this.allMessages
          .filter((item) => item.type === type)
      }
    },
    mounted () {
      this.getMessages()
    }
  }
</script>
<style>
  .bold {
    font-weight: bold;
  }
  .mail-box {
    margin-top: 15px;
  }
  .mail-body {
    background-color: #f8f8f8;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.43);
  }
  .mail-header{
    height: 50px;
    background-color: #4a90e2;
    color: #fff;
    font-size: 18px;
    padding: 10px 20px;
    font-weight: bold;
  }
  .mail-body .tabs { padding-bottom: 10px; }
  .mail-body .nav-pills { background: #fff; }
  .mail-body .nav-pills .nav-link {
    color: #000;
    border-radius: 0;
    font-size: 14px;
    font-weight: bold;
    padding: 13px 1.5em;
  }
  .mail-body .nav-pills .nav-link.active {
    background: #fff !important;
    color: #4990e2;
    border-bottom: 2px solid #4990e2;
    border-radius: 0;
  }
  .mail-body .tab-pane .reply { text-align: center; }
  .mail-body .tab-pane ul { list-style: none; }
  .mail-body .tab-pane ul li { margin: 8px 0; }
  .mail-body .tab-pane ul .fa-share {
    color: #9d9d9d;
    font-size: 14px;
  } 
  .mail-body .tab-pane ul .fa-reply {
    color: #4990e2;
    font-size: 14px;
  }
  .mail-body .tab-pane li .date-time {
    color: #747474;
    font-size: 12px;
  }
  .mail-body .tab-pane li .row {
    margin-left: 0;
    margin-right: 0;
  }
  .mail-body .activity {
    margin-left: 25px;
  }
  .mail-body .tab-pane li .title { font-size: 14px; }
  .mail-body .tab-pane li .from { font-size: 13px; }
  .mail-body .tab-pane li .message { font-size: 12px; }
  .mail-body .tab-content .fa-caret-right { margin-top: 26px; }
  .mail-body .tab-content {
    max-height: 1078px;
    overflow: auto;
    height: calc(100vh - 130px);
  }

  ul {
    padding-left: 0px;
  }
</style>