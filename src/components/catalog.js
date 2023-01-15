import Vue from '../../lib/vue.js';

import Modal from './modal.js';

import { ToolsService } from '../services/toolsService.js';
import { ProductsService } from '../services/productsService.js';
import { PicsService } from '../services/picsService.js';

let Main = Vue.component('catalog', {
  	template: '<div><div class="big-product-card">'+
                      '<div class="big-product"><img :src="bigImageUrl"/></div>'+
                      '<div class="big-product"><div class="big-product--text">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself.</div><div class="big-price"><div class="big-price__digits">${{bestPrice}}</div><div class="big-price__words">best price</div></div></div>'+                                        
                  '</div>'+
      '<div class="browse__category">'+
      	'<span class="browse__category-title">Categories: </span>'+
      	'<span class="browse__category-item">Milk products</span>'+
      	'<span class="browse__category-item">Sugar cakes</span>'+
      '</div>'+
      '<div class="sort">'+
      	'<span class="sort-title">Sort: </span>'+
      	'<span class="selected sort-item">Price up</span>'+
      	'<span class="sort-item">Price down</span>'+
      	'<span class="sort-item">Date up</span>'+
      	'<span class="sort-item">Date down</span>'+
      	'<span class="sort-item">A-z</span>'+
      '</div>'+
      '<div class="products-list"><div v-for="(item, index) in products" class="product-card" v-on:click="showProduct(item)">'+
      '<img  :src="item.url" />'+
  		'<div class="product-card__name">{{item.name}}</div>'+
  		'<div class="product-card__price">{{item.price}}</div>'+
  		'<div class="product-card__cover""></div>'+
  		'<div class="product-card__badge" v-bind:class="{ hide: item.badge.length == 0}">{{item.badge}}</div>'+
      '<div class="product-card__buy" v-bind:class="{ hide: (item.badge.length > 0) || orderCreated}" v-on:click="addProduct($event, item)">buy</div>'+
  	 '</div></div>'+ 
     '<modal></modal>'+    
     '</div>',
    data: function () {
        return {
          products: [],
          orderCreated: false,
          bigImageUrl: "",
          bigImageSize: 320,
          bestPrice: 0
        }
    },
  	created: function() {
      var self = this;
      
      this.bigImageUrl = PicsService.finallyGetPicUrl(this.bigImageSize).final;
      
  		this.products = ProductsService.getAllProducts();
  		
  		this.bestPrice = ToolsService.getRandomFloat(0, 1000, 2);

      this.$root.$on("orderCreated", function(){
        self.orderCreated = true;
      }); 

      this.$root.$on("catalogRefresh", function(){
        self.products = ProductsService.getAllProducts();
        self.currentProducts = ProductsService.getCurrentProducts();
        
        var ids = []; 
        for(var p of self.currentProducts) {
          ids.push(p.id);
        }

        for(var p of self.products) {
          if (ids.indexOf(p.id) !== -1){
            p.badge = "added";
          }
        }

        self.$forceUpdate();
      });

      this.$root.$on("cancelOrder", function(){
        self.orderCreated = false;
      }); 
    },
    methods: {
    	sortCatalog: function(direction) {
    		
    	},
    	addProduct: function($event, item) {
          $event.stopPropagation();
	        this.$root.$emit("addProduct", {item: item});
          item.badge = "added";
	    },
      showProduct: function(item) {
          this.$root.$emit("showModal", {item: item});
      }
    }
})

export { Main };
