var DatGrid = DatGrid || {};

(function(){
    
    var toolBox=function(params){
        
        
        params=params || {};
        
        this.parent = $(params.parent);
        
        // create the list and add it to the parent
        this.domElm = $("<ul class='dat-grid-toolbox-maincontainer'>");
        this.parent.append(this.domElm);
        
        this.models=[];
        this.filteredList=[];
       
        this.filterName="";

    };
    
    
    toolBox.prototype.addModel = function (widgetModel){
       this.models.push(widgetModel);
       
       $(this).trigger('modelAdded',[widgetModel]);

       this.filter();
       this.draw();
    };
    
    toolBox.prototype.filter = function(){
        
        if(this.filterName === "")
            // if nothing to filter then we take the full model list
            this.filteredList = this.models;
        else{
            // else we search into the models for name matching
            this.filteredList = [];
            for(var i=0 ; i < this.models.length  ; i++ ){
                
                if( this.models[i].name.indexOf(this.filterName) >=0 )
                    this.filteredList.push(this.models[i]);
                
            }
        }
        
    };
    
    toolBox.prototype.filterByName = function(name){
        this.filterName = name;
        this.filter();
        this.draw();
    };
    
    toolBox.prototype.draw = function(){
        $(this.domElm).empty();
        
        
        for(var i=0 ; i < this.filteredList.length  ; i++ ){
            
            var model = this.filteredList[i];
            
            var tmpElm = $(
                    "<li class='dat-grid-toolbox-item dat-grid-widget-model type-"+model.type+"'>"
                        +"<i class='dat-grid-model-icone'></i> <span class='dat-grid-model-name'>"+model.name+"</span> <div class='dat-grid-model-representation'>  </div> "
                    +"</li>"
            );
            
            tmpElm.data("widget-model",model);
            
            tmpElm.find(".dat-grid-model-representation").append(model.getDimensionRepresentation(2));
            
            tmpElm.draggable({
                helper:'clone'
            });
            
            this.domElm.append( tmpElm );
 
        }
    };
    
    
    
    
    
    DatGrid.ToolBox=toolBox;
    
})();