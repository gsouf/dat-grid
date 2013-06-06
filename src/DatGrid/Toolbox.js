var DatGrid = DatGrid || {};

(function(){
    
    var toolBox=function(params){
        
        
        params=params || {};
        
        this.parent = $(params.parent);
        
        // create the list and add it to the parent
        this.domElm = $("<ul>");
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
        console.log(this.filteredList.length);
            
            var model = this.filteredList[i];
            
            this.domElm.append(
                $("<li class='dat-grid-toolbox-item type-"+model.type+"'><i class='item-icone'></i> <span>"+model.name+"</span> </li>")
            );
 
        }
    };
    
    
    
    
    
    DatGrid.ToolBox=toolBox;
    
})();