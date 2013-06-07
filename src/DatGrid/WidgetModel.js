var DatGrid = DatGrid || {};


(function(){
    
    var widgetModel=function(params){
        params=params || {};
        

        
        this.name   = params.name || "Unnamed";
        this.categories = params.categories || [];


        this.width  = params.width || 1;
        this.height = params.height || 1;
        this.widthLocked  = params.widthLocked !== undefined ? params.widthLocked : true;
        this.minWidth  = params.minWidth || 1;
        this.maxWidth  = params.maxWidth || 4;
        this.minHeight = params.minHeight || 1;
        this.maxHeight = params.maxHeight || null;
        this.heightLocked =  params.heightLocked !== undefined ? params.heightLocked : true;
        this.type   = params.type || "empty";
        
        this.removable = params.removable || true;
        
        this.configs= params.config || {};
        
    };

    
    /**
     * This method returns a node element that represents the dimensions of the model (drawn with squares)
     */
    widgetModel.prototype.getDimensionRepresentation = function (size){

        size = size || 2;

        var r=$("<div class='widget-model-dimension-representation'  />");
        r.css({
            width : (1+size)*this.width,
            height: (1+size)*this.height
        });
        
        for(var i=0 ; i<this.height ; i++){
            for(var j=0 ; j<this.width ; j++){
                
                
                r.append("<div style='width : "+size+"px ; height : "+size+"px ' >");
            }
        }
        
        return r;

    };
    

    DatGrid.WidgetModel=widgetModel;
    
})();