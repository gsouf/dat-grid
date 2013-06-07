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
            x:4,
            y:2,
            width:2,
            height:1,
            widthLocked:false,
            heightLocked:false,
        });
        
        this.addWidget({
            x:1,
            y:1,
            width:1,
            height:1
        });
        
        var self=this;
        
        
        
        this.showListInInspector=false;
        this.hidden=false;

    };
    
    gridster.prototype.setDroppable = function(isDroppable){
        
        if(isDroppable){
            this.domElm.droppable({
                accept: ".dat-grid-widget-model",
                drop  : function(e,ui){
                    var model = $(ui.draggable).data("widget-model");
                    $(self).trigger("widgetModelDropped" , model ) ;
                }
            });
        }else{
            this.domElm.droppable('disable');
        }
        
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