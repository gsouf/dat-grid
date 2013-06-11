var DatGrid = DatGrid || {};

DatGrid.fieldTypes = {};

DatGrid.registerFieldType = function(name,params){
    DatGrid.fieldTypes [name] = new DatGrid.FieldType(params);
};

DatGrid.getFieldType = function(name){

    return DatGrid.fieldTypes[name];
    
};

DatGrid.loadDefaultFieldTypes = function (){
    
    
    
}