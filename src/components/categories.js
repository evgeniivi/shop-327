import Vue from '../../lib/vue.js';

import { ProductsService } from '../services/productsService.js';

let Main = Vue.component('categories', {
  	template: 
		'<div class="categories-main" v-bind:class="{hide: hiddenCategories}">'+
			'<div class="category" v-for="name in categories"><span>{{name}}</span></div>'+
      '</div>',
    data: function () {
        return {
          hiddenCategories: true,
          categories: []
        }
    },
    created: function() {
      var self = this;
      
      this.categories = ProductsService.getCategories();

      this.$root.$on("showCategories", function(){        
        self.hiddenCategories = false;
      });

      this.$root.$on("hideCategories", function(){        
        self.hiddenCategories = true;
      });
    }
})

export { Main };