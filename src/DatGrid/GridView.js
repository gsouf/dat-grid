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
        
        this.cellWidth  = width  || 0;
        this.cellHeight = height || 0;
        
        this.DomElement = $("<div>");
        this.DomElement.addClass("dat-grid-view-grid-helper");
        this.parent      = null;
    };
    
    gridView.prototype.drawTo = function(parent){
        this.parent=$(parent);
        this.parent.append(this.DomElement);
        
        var self=this;
        
        this.parent.resize(function(){
            // TODO : doesnt work
            self.DomElement.css({ height:self.parent.height() });
            self.refresh();
        });
        
        
        
    };
    
    gridView.prototype.refresh=function(){
        
        this.DomElement.empty();
        
        // GET THE NUMBER OF CELLS
        var numberX = this.parent.width()/this.cellWidth; 
        var numberY = this.parent.height()/this.cellHeight; 

        console.log(this.parent.height());

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


