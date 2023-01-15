import { ToolsService } from './toolsService.js';

let fillers = ['circle', 'rect', 'line'];
let width = 200;
let height = 200;
let tempImages = [];
let canvas = document.createElement('canvas');

let PicsService = {
getRandom: function(min, max) {
		var x = Math.ceil(Math.random() * (max - min) + min);	
		if (max == x) {
			x--;
		}
		return x;
	},
	drawCircle: function(mainContext){
	 mainContext.beginPath();
    mainContext.arc(ToolsService.getRandom(0, width), ToolsService.getRandom(0, height), ToolsService.getRandom(10, 14),  0, 2 * Math.PI, true);
    /*mainContext.fillStyle = ToolsService.getFromWarmColors();
    mainContext.fill();     */
    mainContext.lineWidth = ToolsService.getRandom(5, 10);
    mainContext.strokeStyle = ToolsService.getFromWarmColors();
    mainContext.stroke();
	},
	drawRect:function(mainContext){
	 var size = ToolsService.getRandom(0, 15)
	 mainContext.beginPath();
    mainContext.rect(ToolsService.getRandom(0, width), ToolsService.getRandom(0, height), size, size)
    /*mainContext.fillStyle = ToolsService.getFromWarmColors();
    mainContext.fill();*/
    mainContext.lineWidth = ToolsService.getRandom(5, 10);
    mainContext.strokeStyle = ToolsService.getFromWarmColors();
    mainContext.stroke();
	},
	drawLine: function(ctx){
	 let coords = this.getGoodLine()
	 ctx.beginPath();
	 ctx.moveTo(coords.x1, coords.y1); 
	 ctx.lineTo(coords.x2, coords.y2);
    ctx.lineWidth = ToolsService.getRandom(5, 10);
    ctx.strokeStyle = ToolsService.getFromWarmColors();
	 ctx.stroke();
  	},
  	generateFigures: function(){
		var figures = [];
		var length = ToolsService.getRandom(10, 20);

		for (var i = 0; i < length; i++) {
			var filler = ToolsService.getRandomArrayValue(fillers);
			figures.push(filler);
		}

		return figures;
	}, 
	getGoodLine: function() {
        let length = 150, x1,x2,y1,y2;
        let cond = false;

        while(!cond) {
            x1 = this.getRandom(0, width);
            x2 = this.getRandom(0, width);
            y1 = this.getRandom(0, height);
            y2 = this.getRandom(0, height);
            length = this.distance(x1,y1,x2,y2);
            cond = length < 70 && length > 20
        }

        return {x1:x1,x2:x2, y1:y1,y2:y2}
    },
    distance: function(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1)*(x2 - x1) +(y2 - y1)*(y2 - y1)) ;
    },  
	drawFigures: function(context){
		var figures = this.generateFigures();
		tempImages = [];
		
		for(var i = 0; i < figures.length;i++){
			switch(figures[i]) {
				case "circle":
					this.drawCircle(context);
					break;
				case "rect":
					this.drawRect(context);
					break;
				case "line":
					this.drawLine(context);
					break;
			}
			
			if(Math.random() < 0.25){
				tempImages.push(canvas.toDataURL());
			}
		}
	},
	finallyGetPicUrl:function(size){
			canvas.width  = width = size;
			canvas.height = height = size;

			let context = canvas.getContext('2d');
			this.drawFigures(context);
			
			return {
				pre: tempImages,
				final: canvas.toDataURL()
			};
	}
}

export { PicsService };