var DatGrid = DatGrid || {};


(function(){
    
    var widgetModel=function(params){
        params=params || {};
        
        this.name   = params.name || "Unnamed";
        this.categories = params.categories || [];

        this.width  = params.width || 0;
        this.height = params.height || 0;
        this.widthLocked  = params.widthLocked || true;
        this.heightLocked = params.heightLocked || true;
        this.type   = params.type || "empty";
        
        this.removable = params.removable || true;
        
        this.configs= params.config || {};
        
        
    };
    
    

    DatGrid.WidgetModel=widgetModel;
    
})();