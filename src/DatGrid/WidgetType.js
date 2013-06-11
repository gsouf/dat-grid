var DatGrid = DatGrid || {};


(function(){
    
    var widgetType=function(params){
        params=params || {};
        
        /**
         * Field is made of :
         *  name        -   name of the field
         *  type        -   type of the field -> registered by DatGrid.registerFieldType()
         */
        this.fields   = params.fields;
        
        this.getHtml  = params.getHtml;
        
    };

    
    /**
     * This method returns a node element that represents the dimensions of the model (drawn with squares)
     */
    widgetType.prototype.getDimensionRepresentation = function (size){

    };
    

    DatGrid.WidgetType=widgetType;
    
})();