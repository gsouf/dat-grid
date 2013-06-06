var DatGrid = DatGrid || {};

/**
 *  The grid view is a helper that helps to draw a grid
 *  depending on the given params.
 *  
 *  Once it is configured you can draw it into a relative positioned DOM Element.
 *  
 */
(function(){
    
    var gridView=function(height,width){
        
        this.cellWidth  = width  || 0; // width of the cells
        this.cellHeight = height || 0; // height of the cells
        
        this.DomElement = $("<div>"); // Div into which we will draw the grid
        this.DomElement.addClass("dat-grid-view-grid-helper"); // class for css (into dat-grid.css)
        this.parent     = null;  // the element into which display the grid. The grid size will be adapted to this element. This element has to be positionned
    };
    
    gridView.prototype.drawTo = function(parent){
        this.parent=$(parent);
        this.parent.append(this.DomElement);
        
        var self=this;
        
        // IF SIZE HAS BEEN MODIFIED, THEN WE UPDATE THE GRID
        setInterval(function(){
            if(self.DomElement.height() !== self.parent.height()){
            
                self.DomElement.css({ height:self.parent.height() });
                self.refresh();
            }
        },500);
        
        
        
    };
    
    gridView.prototype.refresh=function(){
        
        this.DomElement.empty();
        
        // GET THE NUMBER OF CELLS
        var numberX = this.parent.width()/this.cellWidth; 
        var numberY = this.parent.height()/this.cellHeight; 

        // SET THE NEW DIMENSIONS
        this.DomElement.css({
            height:this.parent.height(),
            width:this.parent.width()
        });
        
        // ADD THE GRIDS
        for (var i = 0; i < numberY; i++) {
            for(var j = 0; j < numberX; j++){
                $('<div />', {
                    width: this.cellWidth - 1,
                    height: this.cellHeight - 1
                }).appendTo(this.DomElement);
            }
        }

    };

    DatGrid.GridView=gridView;
    
})();


