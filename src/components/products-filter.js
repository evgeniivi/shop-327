import Vue from '../../lib/vue.js';

import { ToolsService } from '../services/toolsService.js';
import { ProductsService } from '../services/productsService.js';

let Main = Vue.component('products-filter', {
    template: '<div class="filter-main" v-bind:class="{hide: hiddenFilter}">'+
        '<div class="filter__row">'+
          '<div class="filter__by-title">By title:</div>'+
          '<input class="filter__by-text" type="text" v-model="mask" @change="filter()" />'+
        '</div>' +
        '<div class="filter__row">'+
          '<div class="filter__price-title">By price:</div>'+
          '<div class="filter__price-block">'+
            '<div class="filter__price-from-title">From</div>'+
            '<input class="filter__price-from-text" type="text" v-model="from" @change="filterFrom()" />' +
            '<div class="filter__price-to-title">To</div>'+
            '<input class="filter__price-to-text" type="text" v-model="to" @change="filterTo()"/>'+
          '</div>' +
        '</div>' +
        '<div class="filter__row"><div class="filter__by-input"><input class="button" type="submit" @click="clearFilter()" value="clear filter"/></div>'+
      '</div>',
    data: function () {
        return {
          hiddenFilter: true,
          mask: "",
          from: 0,
          to: 0
        }
    },
    created: function() {
      var self = this;

      this.$root.$on("showFilter", function(){        
        self.hiddenFilter = false;
      });

      this.$root.$on("hideFilter", function(){        
        self.hiddenFilter = true;
      });
    },
    methods: {
      filterFrom: function(){
        this.filterPrice();
      },
      filterTo: function(){
        this.filterPrice();
      },
      filterPrice: function(){
        if (this.from && this.to) {
          var count = ProductsService.filter(this.mask, this.from, this.to);
          this.$root.$emit("catalogRefresh", { filteredProductsCount: count });
        }
      },
      filter: function(){
        var count = ProductsService.filter(this.mask, this.from, this.to);
        this.$root.$emit("catalogRefresh", { filteredProductsCount: count });
      },
      clearFilter: function(){
        ProductsService.clearFilter();
        this.$root.$emit("catalogRefresh");
      }
    }
})

export { Main };
