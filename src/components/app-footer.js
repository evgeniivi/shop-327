import Vue from '../../lib/vue.js';

import { ProductsService } from '../services/productsService.js';

let Main = Vue.component('app-footer', {
  	template: '<div class="footer">'+
          '<div class="menu">'+
            '<div class="menu-item">Delivery and Prices</div>'+
            '<div class="menu-item">Terms and Conditions</div>'+
            '<div class="menu-item">Sitemap</div>'+
          '</div>'+
          '<div class="menu">'+
            '<div class="menu-item">Health cooking courses</div>'+
            '<div class="menu-item">Personal Diets</div>'+
            '<div class="menu-item">Food Brands</div>'+
          '</div>'+
          '<div class="menu">'+
            '<div class="menu-item">Free / sale</div>'+
            '<div class="menu-item">Book of success</div>'+
          '</div>'+
          '<div class="copyright">© Copyright: Vinokurov Evgeniy & Cat 2021</div>'+
      '</div>',
    data: function () {
        return {
          data: ""
        }
    },
  	created: function() {
    },
    methods: {
      
    }
})

export { Main };
