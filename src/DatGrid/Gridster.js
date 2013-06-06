var DatGrid = DatGrid || {};

(function(){
    
    var gridster=function(params){
        
        params=params || {};
        params.gridster=params.gridster || {};
        
        this.parent = $(params.parent);
        
        this.domElm = $("<ul>");
        this.parent.append(this.domElm);
        
        this.gridster=this.domElm.gridster(params.gridster);
        
        this.addWidget({
            x:2,
            y:1,
            width:2,
            height:1
        });
        
        this.addWidget({
            x:1,
            y:0,
            width:1,
            height:1
        });

    };
    
    
    gridster.prototype.addWidget = function (widget){
        
        
        if( !(widget instanceof DatGrid.Widget) ){
            widget = new DatGrid.Widget(widget);
            console.log(widget);
        }
        this.gridster.data('gridster').add_widget( widget.getElement(),widget.x,widget.y,widget.width,widget.height );
        
        return widget;
    };

    DatGrid.Gridster=gridster;
    
})();