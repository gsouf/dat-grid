var DatGrid = DatGrid || {};



(function(){ // EXTENDS WidgetModel
    
    var widget=function(params){
        params=params || {};
        
        DatGrid.WidgetModel.apply(this,[params]);
        
        this.x      = params.x || 1;
        this.y      = params.y || 1;
        this.opacity= params.opacity || 1;
        
        this.removable = params.removable || true;
        
        this.layout = null;
        
        this.DomElement = $("<li class='dat-grid-widget-body' />");
        
        this.DomElement.data("dat-grid-widget",this);
        
        this.initElement();
        

        
   
    };
    
    widget.prototype = Object.create(DatGrid.WidgetModel.prototype);
    
    widget.prototype.initElement=function(){
        
        // REMOVABLE
        //
        if(this.removable){
            this.DomElement.addClass("widget-removable");
        }
        //
        ///////////
        
        this.DomElement.addClass("widget_type-"+this.type);
        this.DomElement.css({opacity:this.opacity});
        
    };
    
    widget.prototype.refreshView=function(){
      
        this.DomElement.empty();
        this.DomElement.append(this.getWidgetType().getView(this));
        
    };
    
    
    
    
    widget.prototype.addColumn = function(number){

        number = number || 1;
        
        if(this.widthLocked)
            return false;
        
        if( this.maxWidth!==null && this.maxWidth < this.width+number ){
            this.width=this.maxWidth;
        }else{
            this.width+=number;
        }
        
        this.layout.gridster.data('gridster').resize_widget(this.DomElement,this.width,this.height);
        
        $(this).trigger("sizeChanged");
        
    };
    
    widget.prototype.removeColumn = function(number){

        number = number || 1;
        
        if(this.widthLocked)
            return false;
        
        if( this.minWidth > this.width-number ){
            this.width=this.minWidth;
        }else{
            this.width-=number;
        }
        
        this.layout.gridster.data('gridster').resize_widget(this.DomElement,this.width,this.height);
        $(this).trigger("sizeChanged");
    };
    
    widget.prototype.addRow = function(number){

        number = number || 1;
        
        if(this.heightLocked)
            return false;
        
        if( this.maxHeight!==null && this.maxHeight < this.height+number ){
            this.height=this.maxHeight;
        }else{
            this.height+=number;
        }
        
        this.layout.gridster.data('gridster').resize_widget(this.DomElement,this.width,this.height);
        $(this).trigger("sizeChanged");
    };
    
    widget.prototype.removeRow = function(number){

        number = number || 1;
        
        if(this.heightLocked)
            return false;
        
        if( this.minHeight > this.height-number ){
            this.height=this.minHeight;
        }else{
            this.height-=number;
        }
        
        this.layout.gridster.data('gridster').resize_widget(this.DomElement,this.width,this.height);
        $(this).trigger("sizeChanged");
    };
    
    widget.prototype.showConfig = function(){
        var self=this;
        var c = new DatGrid.ConfigBox(this);
        c.show();
        $(c).on("saved",function(){
            alert("ll");
            self.refreshView();
        });
    };
    
    widget.prototype.getElement=function(){
        return this.DomElement;
    };

    DatGrid.Widget=widget;
    
})();