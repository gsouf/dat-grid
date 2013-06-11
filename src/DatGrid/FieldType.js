var DatGrid = DatGrid || {};


(function(){
    
    var fieldType=function(params){
        params=params || {};
        
        /**
         *  getValue        -   returns the config value
         *  view            -   return the element to be appended to the config box
         */
        this.valueGetter   = params.valueGetter;
        
        this.viewGetter  = params.viewGetter;        
    };

    
    fieldType.prototype.getView = function (value,options){
        return this.viewGetter(value,options);
    };
    
    fieldType.prototype.getValue = function (element){
        return this.valueGetter(element);
    };
    

    DatGrid.FieldType=fieldType;
    
})();