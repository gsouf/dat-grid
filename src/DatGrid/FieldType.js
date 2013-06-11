var DatGrid = DatGrid || {};


(function(){
    
    var fieldType=function(params){
        params=params || {};
        
        /**
         *  getValue        -   returns the config value
         *  view            -   return the element to be appended to the config box
         */
        this.getValue   = params.getValue;
        
        this.view  = params.view
;        
    };

    
    /**
     * This method returns a node element that represents the dimensions of the model (drawn with squares)
     */
    fieldType.prototype.getDimensionRepresentation = function (size){

    };
    

    DatGrid.FieldType=fieldType;
    
})();