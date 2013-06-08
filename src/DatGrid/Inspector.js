var DatGrid = DatGrid || {};

(function(){
    
    var inspector=function(params){
        
        
        params=params || {};
        
        this.parent = $(params.parent);
        
        // create the list and add it to the parent
        this.domElm = $("<ul class='dat-grid-inspector-maincontainer'>");
        this.parent.append(this.domElm);
        
        this.layouts = [];

    };
    
    
    inspector.prototype.addLayout = function(layout){
        this.layouts.push(layout);
        
        var self = this;
        
        $(layout).on("widgetAdded",function(){
            self.draw();
        });
        
        self.draw();
        
    };
    
    /**
     * this method will redraw all the inspector.
     * 
     * It will consider if each layout is hidden and if the list should be displayed
     * 
     * 
     * @returns {undefined}
     */
    inspector.prototype.draw = function(){
        $(this.domElm).empty();
        
        // FOREACH LAYOUT WE CREATE A LIST
        for(var i=this.layouts.length - 1 ; i >= 0   ; i-- ){
            
            var layout=this.layouts[i];
            
            var widgets = layout.domElm.find(">li");
            
            var hidden   = layout.hidden; // this layout is hidden ?
            var showList = layout.showListInInspector; // show the list for this layout
            
            
            // CREATE THE ROOT OF THE INSPECTOR 
            var tmpLayoutRoot = $(
                 "<div class='dat-grid-inspector-root-layout' >"
                    +"<div>"
                        +"<i class='dat-grid-inspector-layout-expander "+(showList?"icon-minus":"icon-plus")+" '>  </i>"
                        +"<span class='dat-grid-inspector-layout-name> TODO name </span><span class='dat-grid-inspector-layout-count> ("+widgets.length+") </span>"
                        +"<i  class='dat-grid-inspector-layout-toggler "+(!hidden?" icon-eye-open":"icon-eye-close")+"'> </i>"
                    +"</div>"
                    +"<ul></ul>"
                +"</div>");
        
        
            // LINK THE LAYOUT TO THE DOM DATA
            tmpLayoutRoot.data("dat-grid-layout",layout);
            
            // MAKE IT DROPPABLE FOR THE MODELS
            tmpLayoutRoot.droppable({
                accept: ".dat-grid-widget-model",
                drop  : function(e,ui){
                    
                    var model = $(ui.draggable).data("widget-model");
                    $(this).data("dat-grid-layout").addWidget(model); ;
                }
            });
        
            // SHOW THE LIST ?
            if(!showList){
                tmpLayoutRoot.find(">ul").hide();
            }
                
            // BIND THE EVENT TO HIDE/SHOW THE LIST
            tmpLayoutRoot.find('.dat-grid-inspector-layout-expander').click(function(){
                var layout = $(this).closest(".dat-grid-inspector-root-layout");

                layout.data("dat-grid-layout").showListInInspector = ! layout.data("dat-grid-layout").showListInInspector;
                
                $(this).closest(".dat-grid-inspector-root-layout").find(">ul").toggle(200);
                
                if( $(this).hasClass('icon-plus') ){
                    $(this).removeClass('icon-plus');
                    $(this).addClass('icon-minus');
                }else{
                    $(this).addClass('icon-plus');
                    $(this).removeClass('icon-minus');
                }
            });
            
            // BIND THE EVENT TO HIDE/SHOW THE FULL LAYOUT
            tmpLayoutRoot.find('.dat-grid-inspector-layout-toggler').click(function(){
                var layoutElm = $(this).closest(".dat-grid-inspector-root-layout");
                
                var layout = layoutElm.data("dat-grid-layout");
                
                
                
                
                layout.setHidden(!layout.hidden);
                
                
                $(this).removeClass("icon-eye-open icon-eye-close");
                
                if(layout.hidden){
                    $(this).css({opacity:0.3});
                    $(this).addClass("icon-eye-close");
                }else{
                    $(this).css({opacity:1});
                    $(this).addClass("icon-eye-open");
                }
                
            });
            
            // WE ADD ITEMS TO THE LIST (each item is a widget)
            for(var j=0 ; j < widgets.length  ; j++ ){
                
                // GET THE WIDGET FROM THE DOM ELM's DATAS
                widget=$(widgets[j]).data("dat-grid-widget");
            
                // CREATE THE LIST ITEM REPRESENTATION OF THE WIDGET
                var tmpElm = $(
                    "<li class='dat-grid-inspector-item'>"
                        +"<i class='dat-grid-model-icone'></i> <span class='dat-grid-model-name'> "+widget.type+" </span> <div class='dat-grid-model-representation'>  </div> "
                    +"</li>"
                );
                tmpElm.find(".dat-grid-model-representation").append(widget.getDimensionRepresentation(2));
                
                // SET DATA TO GET IT LATER
                tmpElm.data("widget",widget);
                // SHOW IT
                tmpLayoutRoot.find(">ul").append(tmpElm); 
                
                // HIGHTLIGHT THE ITEM IN THE GRIDSTER EDITOR WHEN OVER IT IN THE LIST
                $(tmpElm).hover(
                    function(){
                        var widget=$(this).data("widget");
                       // widget.beforeHoverBorder=widget.DomElement.css('border');
                        widget.DomElement.css({
                            outline: "2px solid red"
                        });
                    },
                    function(){
                        var widget=$(this).data("widget");
                        widget.DomElement.css('outline',0);
                    }
                );
            }

            this.domElm.append( tmpLayoutRoot );
 
        }
    };
    
    
    
    
    
    DatGrid.Inspector=inspector;
    
})();