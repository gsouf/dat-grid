var DatGrid = DatGrid || {};

DatGrid.fieldTypes = {};
DatGrid.widgetTypes = {};

DatGrid.registerFieldType = function(name,params){
    DatGrid.fieldTypes [name] = new DatGrid.FieldType(params);
};

DatGrid.getFieldType = function(name){

    if(name instanceof DatGrid.FieldType){
        return name;
    }

    var fieldType = DatGrid.fieldTypes[name];
    

    if(!fieldType){

        return new DatGrid.FieldType({
            valueGetter : function(elm){
                return $(elm).find("input").first().val();
            },
            viewGetter : function(value,options){   
                return "<input type = '"+name+"' value='"+value+"' />";
            }
        });

    }else{
        return fieldType;
    }
        
        

    
    return fieldType;
    
};

DatGrid.loadDefaultFieldTypes = function (){
    
    
    
};


DatGrid.registerWidgetType = function(name,params){
    DatGrid.widgetTypes [name] = new DatGrid.WidgetType(params);
};

DatGrid.getWidgetType = function(name){

    return DatGrid.widgetTypes [name];
    
};

DatGrid.loadDefaultWidgetTypes = function (){
    
    
    
};