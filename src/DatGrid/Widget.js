var DatGrid = DatGrid || {};


(function(){ // EXTENDS WidgetModel
    
    var widget=function(params){
        params=params || {};
        
        DatGrid.WidgetModel.apply(this,[params]);
        
        this.x      = params.x || 1;
        this.y      = params.y || 1;
        this.opacity= params.opacity || 1;
        
        this.removable = params.removable || true;
        
        this.DomElement = $("<li class='dat-grid-widget-body' >");
        
        this.DomElement.data("dat-grid-widget",this);
        
        this.initElement();
   
    };
    
    widget.prototype = Object.create(DatGrid.WidgetModel.prototype);
    
    widget.prototype.initElement=function(){
        
        // REMOVABLE
        //
        if(this.removable){
            this.DomElement.addClass("widget-removable");
        }
        //
        ///////////
        
        this.DomElement.addClass("widget_type-"+this.type);
        this.DomElement.css({opacity:this.opacity});
        
    };
    
    widget.prototype.getElement=function(){
        return this.DomElement;
    };

    DatGrid.Widget=widget;
    
})();