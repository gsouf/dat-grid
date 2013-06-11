var DatGrid = DatGrid || {};

(function(){
    
    var configBox=function(params){
        
        
        params=params || {};
        
        this.widget = widget;

    };
    
    
    configBox.prototype.show = function(name){
        
        // backup the actual body content
        var backupElement = $("<div class='dat-grid-widget-configbox-backup' />");
        $("body").children().appendTo(backupElement);
        $("body").append(backupElement);
        
        // create a container filling the full body
        var elm = $("<div class='dat-grid-widget-configbox-wrapper' />");
        $("body").append(elm);
        
        // create a semi transparent background
        elm.append("<div class='dat-grid-widget-configbox-background' />");
        
        // the config area
        var configArea = $("<div class='dat-grid-widget-configbox-area' />");
        elm.append(configArea);
        
        // crate a close (x) button
        configArea.append("<div class='dat-grid-widget-configbox-close-button' > X </div>");
        
    };

    
    DatGrid.ConfigBox=configBox;
    
})();