<template>
  <b-container fluid>
    <b-row>
      <b-col xl="8">
        <b-row class="mb15">
           <b-col lg="3">
            <div class="task-btn">
              <a href="#">Wirewheel Tasking</a>
            </div>
            <div class="task-btn">
              <a href="#">New Module</a>
            </div>
          </b-col>
          <b-col lg="9">
            <forum></forum>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <organization-list></organization-list>
          </b-col>
        </b-row>
      </b-col>
     
      <b-col xl="4">
        <mailbox></mailbox>
      </b-col>
    </b-row>
    
  </b-container>
</template>

<script>
import forum from './forum'
import mailbox from './mailbox'
import organizationList from './organization-list'

export default {
  name: 'home',
  components: {
    forum,
    mailbox,
    organizationList
  }
}
</script>

<style scoped>
  .task-btn {
    width: 100%;
    height: 130px;
    border-radius: 3px;
    background-color: #4a90e2;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 18px;
    margin-top: 15px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mb15 {
    margin-bottom: 15px;
  }
  .task-btn a {
    color: #fff;
    text-decoration: none;
  }
</style>
