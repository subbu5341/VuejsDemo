<template>
  <b-row>
    <b-col cols="12">
      <div class="modules-board">
        <b-tabs pills>
          <b-tab title="Map" active>
            <br>Map Data
          </b-tab>
          <b-tab title="Dashboard">
            <br>Dashboard Data
          </b-tab>
        </b-tabs>
      </div>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: 'moduleBoard',
  data () {
    return {}
  }
}
</script>
<style>
  .modules-board {
    height: 50px;
    background-color: #f9f9f9;
    border: solid 1px #ededed;
    margin-top: 10px;
    font-size: 16px;
  }
  .modules-board .nav-pills .nav-link.active {
    color: #4990e2 !important;
    background-color: #f9f9f9;
    border-bottom: 2px solid #4990e2;
    border-radius: 0px;
  }
  .modules-board .nav-pills .nav-link {
    color: #000 !important;
    background-color: #f9f9f9;
  }
</style>
