DatGrid.registerFieldType("checkbox",{
    valueGetter : function(elm){
        return $(elm).find("input").is(":checked") ? true : false;
    },
    viewGetter : function(value,opt){
        console.log("lllll");
        return "<label>"+opt.name+"</label> <input type='checkbox' "+(value == true ? "checked='checked'":"")+" />";
    }
});
