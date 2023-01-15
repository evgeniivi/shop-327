import Vue from '../../lib/vue.js';

import { ToolsService } from '../services/toolsService.js';
import { ProductsService } from '../services/productsService.js';

let Main = Vue.component('cart-total-confirm', {
  	template: 
			'<div><div class="cart-total" v-bind:class="{ hide: hiddenTotal }">'+
          '<div class="cart-total__price">Total: {{total}}</div>'+      
          '<div v-bind:class="{ hide: hiddenButton }" class="cart-total__confirm button" v-on:click="confirm()">Confirm</div>'+
          '<img v-bind:class="{ hide: hiddenLoading }" class="cart-total__loading" src="./assets/img/1484.gif" width="40px"/>'+
      '</div>'+
      '<div class="cart-total__greetings" v-bind:class="{ hide: !hiddenTotal }">'+
        'Thanks For Shopping. We will Contact You As Soon As Possible<br/>'+
        '<div class="cart-total__greetings-order">Your Order Number <b>#{{orderId}}</b><div class="cancel-cross" v-on:click="cancelOrder()">&times;</div>'+
      '</div></div>',
    data: function () {
        return {
          total: "0",
          hiddenButton: false,
          hiddenLoading: true,
          hiddenTotal: false,
          orderId: 0
        }
    },
  	created: function() {
      let self = this;

      this.total = ProductsService.getTotalPrice();

      this.$root.$on("recount", function(){
        self.total = ProductsService.getTotalPrice();

        if (ProductsService.getCurrentProducts().length == 0) {
          self.$root.$emit("hideCart");
        }
      });
    },
    methods: {    	
    	confirm: function(){
        var self = this;

        this.hiddenButton = true;
        this.hiddenLoading = false;

        setTimeout(function(){
            self.orderId = ToolsService.getRandomNumber();
            self.hiddenLoading = true;
            self.hiddenTotal = true;

            self.$root.$emit("orderCreated", {orderId: self.orderId});
        }, 3000)
    	},
      cancelOrder: function(){
        this.hiddenTotal = false;
        this.hiddenButton = false;

        this.$root.$emit("cancelOrder", {orderId: self.orderId});
      }
    }
})

export { Main };