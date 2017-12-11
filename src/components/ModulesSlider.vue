<template>
  <div>
    <slick ref="slick" v-if="moduleList.length > 0" :options="slickOptions">
      <a v-for="module in moduleList" :key="module.id">
        <module-card v-bind:module-data="module" :isMultiSelect="isMultiSelected()" :isSelectAllModule="isSelectAllModule"></module-card></a>
      </a>
    </slick>
  </div>
</template>

<script>
  import Slick from 'vue-slick'
  import { mapGetters } from 'vuex'
  import ModuleCard from '@/components/ModuleCard.vue'

  export default {
    name: 'ModulesSlider',
    props: ['applications', 'isSelectAllModule'],
    components: { Slick, ModuleCard },
    data () {
      return {
        slickOptions: {
          slidesToShow: 3,
          infinite: false,
          arrows: true,
          prevArrow: '<i class="slick-prev fa fa-angle-left fa-lg"></i>',
          nextArrow: '<i class="slick-next fa fa-angle-right fa-lg"></i>',
          responsive: [
            {
              breakpoint: 1010,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        }
      }
    },
    methods: {
      next () {
        this.$refs.slick.next()
      },
      prev () {
        this.$refs.slick.prev()
      },
      isMultiSelected () {
        return this.applications.filter(function (value) {
          return value.isSelected
        }).length > 1
      }
    },
    computed: {
      ...mapGetters({
        moduleList: 'moduleList'
      })
    },
    mounted () {
      this.$bus.$emit('multiModuleSelected', this.isMultiSelect)
    }
  }
</script>
<style>
    a.slick-slide {
        margin: 0 5px;
        color: #000000;
        outline: none;
    }
    .fa-lg {
        left: unset;
    }
    a.slick-slide {
        color: #000000;
    }
    a.slick-slide:hover {
        text-decoration: none;
    }
    .circle {
        color: #000000;
    }
    .slick-slider {
        position: relative;
        display: block;
        box-sizing: border-box;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -khtml-user-select: none;
        -ms-touch-action: pan-y;
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
    }
    .slick-list {
        position: relative;
        display: block;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
    .slick-list:focus {
        outline: none;
    }
    .slick-list.dragging {
        cursor: pointer;
        cursor: hand;
    }
    .slick-slider .slick-track,
    .slick-slider .slick-list {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    .slick-track {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .slick-track:before,
    .slick-track:after {
        display: table;
        content: '';
    }
    .slick-track:after {
        clear: both;
    }
    .slick-loading .slick-track {
        visibility: hidden;
    }
    .slick-slide {
        display: none;
        float: left;
        height: 100%;
        min-height: 1px;
    }
    [dir='rtl'] .slick-slide {
        float: right;
    }
    .slick-slide img {
        display: block;
    }
    .slick-slide.slick-loading img {
        display: none;
    }
    .slick-slide.dragging img {
        pointer-events: none;
    }
    .slick-initialized .slick-slide {
        display: block;
    }
    .slick-loading .slick-slide {
        visibility: hidden;
    }
    .slick-vertical .slick-slide {
        display: block;
        height: auto;
        border: 1px solid transparent;
    }
    .slick-arrow.slick-hidden {
        display: none;
    }
    .slick-prev {
        cursor: pointer;
        width: 7px;
        height:16px;
        position: absolute;
        left:-13px;
        top: calc(50% - 8px);
        z-index: 1000;
    }
   .slick-next {
        cursor: pointer;
        width: 7px;
        height:16px;
        position: absolute;
        right:-13px;
        top: calc(50% - 8px);
        z-index: 1000;
        display: none;
    }
</style>
