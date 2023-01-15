import { PicsService } from './picsService.js';
import { CategoryService } from './categoryService.js';
import { ToolsService } from './toolsService.js';

let ProductsService = {
	picSize:280,
	categories: [],
	products:[],
	productsAll:[],
	filters: [],
	getByApi: function(){
		return [
		];
	},
	getByApiAll: function(){
		/*var products = [
			{"id":1,"name":"Cheese - Taleggio D.o.p.","price":"$590.97","weight":358.41, "badge": ""},
			{"id":2,"name":"Pasta - Rotini, Colour, Dry","price":"$910.49","weight":993.91, "badge": ""},
			{"id":3,"name":"Noodles - Steamed Chow Mein","price":"$559.89","weight":366.52, "badge": ""},
			{"id":4,"name":"Puree - Pear","price":"$224.80","weight":531.56, "badge": ""},
			{"id":5,"name":"Pimento - Canned","price":"$860.80","weight":1784.61, "badge": ""},
			{"id":6,"name":"Milk - Homo","price":"$524.40","weight":420.04, "badge": ""},
			{"id":7,"name":"Turkey - Oven Roast Breast","price":"$260.89","weight":296.42, "badge": ""},
			{"id":8,"name":"Cheese - Montery Jack","price":"$450.43","weight":1943.4, "badge": ""},
			{"id":9,"name":"Pepper - Cayenne","price":"$174.61","weight":394.91, "badge": ""},
			{"id":10,"name":"Sprouts - China Rose","price":"$573.59","weight":1454.9, "badge": ""},
			{"id":11,"name":"Water - Green Tea Refresher","price":"$364.14","weight":97.23, "badge": ""},
			{"id":12,"name":"Pork - Bacon Cooked Slcd","price":"$605.78","weight":929.49, "badge": ""},
			{"id":13,"name":"Veal - Knuckle","price":"$626.50","weight":1865.16, "badge": ""},
			{"id":14,"name":"Sugar - Monocystal / Rock","price":"$32.99","weight":35.96, "badge": ""},
			{"id":15,"name":"Longos - Lasagna Beef","price":"$83.83","weight":1615.11, "badge": ""},
			{"id":16,"name":"Icecream - Dibs","price":"$830.50","weight":1040.19, "badge": ""},
			{"id":17,"name":"Nantucket Cranberry Juice","price":"$777.21","weight":1214.29, "badge": ""},
			{"id":18,"name":"Wasabi Paste","price":"$817.60","weight":1966.67, "badge": ""},
			{"id":19,"name":"Flour - Bread","price":"$95.21","weight":360.06, "badge": ""},
			{"id":20,"name":"Coke - Diet, 355 Ml","price":"$199.74","weight":504.27, "badge": ""},
			{"id":21,"name":"Basil - Seedlings Cookstown","price":"$780.05","weight":769.49, "badge": ""},
			{"id":22,"name":"Garam Marsala","price":"$116.72","weight":210.74, "badge": ""},
			{"id":23,"name":"Lemonade - Mandarin, 591 Ml","price":"$44.14","weight":1313.34, "badge": ""},
			{"id":24,"name":"Syrup - Monin - Passion Fruit","price":"$355.23","weight":1243.3, "badge": ""},
			{"id":25,"name":"Pepper - Paprika, Hungarian","price":"$923.56","weight":996.47, "badge": ""},
			{"id":26,"name":"Broccoli - Fresh","price":"$645.70","weight":36.29, "badge": ""},
			{"id":27,"name":"Lettuce - Curly Endive","price":"$733.26","weight":493.76, "badge": ""},
			{"id":28,"name":"Nut - Almond, Blanched, Ground","price":"$549.23","weight":1010.49, "badge": ""},
			{"id":29,"name":"Bay Leaf Fresh","price":"$660.60","weight":605.16, "badge": ""},
			{"id":30,"name":"Bread - Bagels, Plain","price":"$250.26","weight":674.29, "badge": ""}
		];
		*/
		let products = [];
		
		for (var i = 0; i< 30; i++) {
			let product = { badge: "", id: i}
			
			let res = PicsService.finallyGetPicUrl(this.picSize);
			let category = CategoryService.getRandomCategory();			
			
			product.url = res.final;
			product.urls = res.pre.reverse();
			product.category = category;
			product.name = CategoryService.getRandomAdjective() + " " + CategoryService.getRandomFoodName().trim() + " and " + CategoryService.getRandomFoodName().trim();
			
			product.name = product.name.toLowerCase();
			
			product.price = "$" + ToolsService.getRandomFloat(1, 2000, 2);
			product.weight = ToolsService.getRandomFloat(100, 500, 2);
			
			products.push(product);			
		}

		return products;
	},
	filter: function(mask, from, to) {
		var self = this;

		if (mask) {
			this.filters.push("byTitle");
		} else {
			this.filters = this.filters.filter(f => f !== 'byTitle');
		}

		if (from && to) {
			this.filters.push("byPrice");
		} else {			
			this.filters = this.filters.filter(f => f !== 'byPrice');
		}

		this.productsAll = (this.getByApiAll()).filter(function(el) { 
			var cond1 = (el.name.toLowerCase().indexOf(mask.toLowerCase()) != -1) 
		 	var price = parseFloat(el.price.replace("$", "")); 
		 	var cond2 = (((price) > parseFloat(from)) && (price < parseFloat(to)));
		 	var result = true;

		 	for (var filter of self.filters) {
		 		switch (filter) {
		 			case "byTitle":
		 				result = result && cond1;
		 			break;
		 			case "byPrice": 			
		 				result = result && cond2;
		 			break;
		 		}
		 	}

		 	return result;
		});
		var countFiltered = (this.getByApiAll()).length - this.productsAll.length;		
		return countFiltered;
	},
	clearFilter: function(mask) {
		this.productsAll = this.getByApiAll();
		return this.productsAll;
	},
	getTotalPrice: function() {
		let sum = 0;
		for(let i of this.products){
			sum += parseFloat(i.price.replace("$", ""));
		}
		return "$" + parseFloat(sum).toFixed(2);
	},
	getCurrentProducts: function() {
		return this.products = (this.products.length > 0 ? this.products : this.getByApi());
	},
	getAllProducts: function() {
		return this.productsAll = (this.productsAll.length > 0 ? this.productsAll : this.getByApiAll());
	},
	getCategories: function(){
		this.categories = [];
		let allProducts = this.getAllProducts();
		
		for(let product of allProducts){
			if (this.categories.indexOf(product.category) == -1) {
				this.categories.push(product.category);
			}
		}
		
		return this.categories;
	},
	addProduct: function(item) {
		this.products.push(item);
		return this.products;
	}
};

export { ProductsService };