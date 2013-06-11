var DatGrid = DatGrid || {};


(function(){
    
    var widgetType=function(params){
        params=params || {};
        
        
        
        /*
         * object with the name of the field type as the key.
         * Each subobject takes the following keys :
         *   - type   :   type of the field -> registered by DatGrid.registerFieldType()
         */
        this.fields   = params.fields;
        
        this.viewGetter  = params.viewGetter;
        
    };

    
    /**
     * This method returns a node element that represents the dimensions of the model (drawn with squares)
     */
    widgetType.prototype.getView = function (widget){
        
        var viewData = new Array();
        
        $(this.fields).each(function(k,v){
            viewData[k]=widget.fields[k].value;
        });
        
        return this.viewGetter(viewData,widget);
    };
    

    DatGrid.WidgetType=widgetType;
    
})();