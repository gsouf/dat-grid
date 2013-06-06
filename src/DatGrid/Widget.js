var DatGrid = DatGrid || {};


(function(){
    
    var widget=function(params){
        params=params || {};
        
        this.x      = params.x || 0;
        this.y      = params.y || 0;
        this.width  = params.width || 0;
        this.height = params.height || 0;
        this.type   = params.type || "empty";
        this.opacity= params.opacity || 1;
        
        this.configs= params.config || {};
        
        this.DomElement = $("<li>");
        
        this.initElement();

        
    };
    
    widget.prototype.initElement=function(){
        
        this.DomElement.addClass("widget_type-"+this.type);
        this.DomElement.css({opacity:this.opacity});
        
    };
    
    widget.prototype.getElement=function(){
        return this.DomElement;
    };

    DatGrid.Widget=widget;
    
})();