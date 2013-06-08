var DatGrid = DatGrid || {};

(function(){
    
    var gridster=function(params){
        
        
        params=params || {};
        params.gridster=params.gridster || {};
        
        this.parent = $(params.parent);
        
        this.domElm = $("<ul>");
        this.parent.append(this.domElm);
        
        this.gridster=this.domElm.gridster(params.gridster);
        
        
        
        var self=this;
        
       
        
        
        this.showListInInspector=false;
        this.hidden=false;

    };
    

    
    gridster.prototype.addWidget = function (widget){
        
        if( !(widget instanceof DatGrid.Widget) ){
            widget = new DatGrid.Widget(widget);
        }

        
        this.gridster.data('gridster').add_widget( widget.getElement(),widget.width,widget.height,widget.x,widget.y );
        
        widget.layout=this;
        
        $(this).trigger("widgetAdded",widget);
        
        return widget;
    };
    
    
    gridster.prototype.removeWidget = function (widget){
        
       
        this.gridster.data('gridster').remove_widget( widget.getElement());
        
        $(this).trigger("removeWidget",[widget]);
        
        return widget;
        
    };
    
    gridster.prototype.setHidden = function(hidden){
        this.hidden=hidden;
        
        $(this).trigger("displayChanged",hidden);
        
        if(hidden){
            this.domElm.hide();
        }else{
            this.domElm.show();
        }
        
    }

    DatGrid.Gridster=gridster;
    
})();