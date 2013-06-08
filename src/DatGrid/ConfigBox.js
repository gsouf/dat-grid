var DatGrid = DatGrid || {};

(function(){
    
    var configBox=function(params){
        
        
        params=params || {};
        
        this.widget = widget;

    };
    
    
    configBox.prototype.show = function(name){
        
        var elm = $("<div class='dat-grid-widget-configbox-wrapper' />");
        elm.append("<div class='dat-grid-widget-configbox-background' />");
        elm.append("<div class='dat-grid-widget-configbox-area' />");
        $("body").append(elm);
    };

    
    DatGrid.ConfigBox=configBox;
    
})();