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
        
        var filePath = DatGrid.fieldAutoloadPath+"/"+name+".fieldtype.js";

        var scriptLoad = $("<script type = 'text/javascript' src = '"+filePath+"' ></script>" );
        $("head").append( scriptLoad );
        
         fieldType = DatGrid.fieldTypes[name];
        /*
        // we try to load the fieldtype from the server
        $.ajax({
            url:filePath,
            dataType: "script",
            type:'HEAD',
            async: true,
            success: function()
            {
               
            },
            error : function(){
                console.warn("No such FieldType script found : "+filePath);
            }
        });*/
        
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


/**
 * the path (relative to the current page) to load automatically the WidgetTypes
 */
DatGrid.widgetTypesLoadPath = function(path){
    DatGrid.widgetAutoloadPath = path;
};

/**
 * the path (relative to the current page) to load automatically the FieldTypes
 */
DatGrid.fieldTypesLoadPath = function(path){
    DatGrid.fieldAutoloadPath = path;
};