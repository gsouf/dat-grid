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
        }
        this.gridster.data('gridster').add_widget( widget.getElement(),widget.x,widget.y,widget.width,widget.height );
        
        $(this).trigger("widgetAdded",widget);
        
        return widget;
    };
    
    
    gridster.prototype.removeWidget = function (widget){
        
       
        this.gridster.data('gridster').remove_widget( widget.getElement());
        
        $(this).trigger("removeWidget",[widget]);
        
        return widget;
        
    };

    DatGrid.Gridster=gridster;
    
})();