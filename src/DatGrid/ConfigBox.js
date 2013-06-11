var DatGrid = DatGrid || {};

(function(){
    
    var configBox=function(widget){
        

        
        this.widget = widget;

        console.log(widget);

    };
    
    
    configBox.prototype.show = function(name){
        
        var self = this;
        
        ///////////////////
        // DRAW IT
        
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
        configArea.find(".dat-grid-widget-configbox-close-button").click(function(){
            self.close();
        });

        // Create the area with the fields
        var fieldsArea = $("<ul class='dat-grid-widget-configbox-fields' />");
        configArea.append(fieldsArea);
        
        
        // Create the save button
        var saveButton = $("<div class='dat-grid-widget-configbox-save-button' >Save</div>");
        configArea.append(saveButton);
        saveButton.click(function(){
            self.save();
            self.close();
        });
        
        //
        /////////////////
        
        
        
        
        
        ////////////////
        // FILL IT
        
        // list of configs value
        var configs = this.widget.configs;
        
        // WidgetType with list of configs definitions
        
        
        var widgetType = DatGrid.getWidgetType(this.widget.type);
        
        
        if(widgetType){
            
            // loop over fields and draw them to the configbox
            for(k in widgetType.fields){
                
                // get field type
                var fieldType = widgetType.fields[k].type; 
                // retrive it from the pool if not already a fieldtype
                

                if( !(fieldType instanceof DatGrid.FieldType) )
                    fieldType = DatGrid.getFieldType(fieldType);
                
                // get the configfield with value from the widget
                var configField = configs[k] || {};
                
                // get the html
                var fieldElm = fieldType.getView(configField.value || "", widgetType.fields[k].options || {});
                
                // append it to the list
                var fieldItem = $("<li dat-grid-name='"+k+"' class = 'dat-grid-widget-configbox-field' />" );
                fieldItem.append(fieldElm).appendTo(fieldsArea);
                fieldItem.data("dat-grid-field-type",fieldType);
            }

        }else{
        
            console.error("No such WidgetType found : '"+this.widget.type+"'");
        
        }
        
        
        //
        /////////////////////
        
        
        this.backupElement  = backupElement;
        this.wrapperElement = elm;
        
    };

    configBox.prototype.save = function(){
        
        // WidgetType with list of configs definitions
        var widgetType = DatGrid.getWidgetType(this.widget.type);
        
        var self=this;
        
        // loop over fields and get the values
        $(this.wrapperElement).find(".dat-grid-widget-configbox-field").each(function(k,element){
            
            configName=$(element).attr("dat-grid-name");
            fieldType =$(element).data("dat-grid-field-type");
            

            self.widget.configs[configName] = self.widget.configs[configName] || {};

            self.widget.configs[configName].value = fieldType.getValue(element);

        });
        
        $(this).trigger("saved");
    };
    
    configBox.prototype.close = function(){
        
        this.backupElement.children().appendTo("body");
        this.backupElement.remove();
        this.wrapperElement.remove();
        
        $(this).trigger("closed");
        
    };
    
    DatGrid.ConfigBox=configBox;
    
})();