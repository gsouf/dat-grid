var DatGrid = DatGrid || {};


(function(){
    
    var fullEditor=function(params){
        params=params || {};
        
        this.toolBoxElm   = params.toolBox;
        this.editorElm    = $(params.editorElm);
        this.inspectorElm = $(params.inspectorElm);
        this.overviewElm  = params.overview;
        
        var tmpDim = params.cellDimensions || [0,0];
        
        this.cellWidth   = tmpDim[0];
        this.cellHeight  = tmpDim[1];
        this.cellMargin  = params.cellMargin || [0,0]; 
        
        this.init();

        
        
    };
    
    
    fullEditor.prototype.init = function(){
        
        //////////////////////////////////////////////
        //
        // CONFIGURATION OF THE EDITOR AREA
        //
        
        // CREATE A GRID VIEW  THAT ALLOWS THE USER TO SEE WHAT HE DOES
        this.gridView = new DatGrid.GridView( this.cellWidth+2*this.cellMargin[0] , this.cellHeight+2*this.cellMargin[1] );
        this.gridView.drawTo(this.editorElm);
        
        // CREATE THE LAYOUT CONTAINER
        this.layoutsElm =$("<div>");
        this.layoutsElm.addClass("dat-grid-full-editor-layouts");
        // ADD IT TO THE EDITOR AREA
        this.editorElm.append(this.layoutsElm);
        
        this.layouts = new Array();
        
        var self=this;
        
        // EACH TIC WE UPDATE THE SIZE OF THE LAYOUT CONTAINER
        // WE NEED IT BECAUSE CHILDREN ARE ABSOLUTE POSITIONNED
        setInterval(function(){
            var greatest=0;
            for(var i = 0 ; i < self.layouts.length ; i++){
                if(self.layouts[i].domElm.height() > greatest ){
                    greatest = self.layouts[i].domElm.height();
                }
            }
            self.layoutsElm.height(greatest);
        },400);
        
        
        var self = this;
        
        // SET IT DROPPABLE FOR WIDGETS
        this.layoutsElm.droppable({
            accept: ".dat-grid-widget-model",
            drop  : function(e,ui){
                var model = $(ui.draggable).data("widget-model");
                var topLayer = self.getTopLayer();
                                
                if(topLayer !== false)
                    topLayer.addWidget(model);
                
            }
        });
        
        //
        //
        //////////////////////////////////////////////
        
        
        
        
        
        
        //////////////////////////////////////////////
        //
        // CONFIGURATION OF THE INSPECTOR AREA
        //

        this.inspector = new DatGrid.Inspector({parent:this.inspectorElm});

        //
        //
        //////////////////////////////////////////////
        
        
        
        //////////////////////////////////////////////
        //
        // CONFIGURATION OF THE CONTEXT MENU
        //

        $.contextMenu({
            // define which elements trigger this menu
            selector: ".dat-grid-widget-body",
            // define the elements of the menu
            items: {
                configure : {name: "Configure", icon:"gear", callback: function(key, opt){
                     opt.$trigger.data("dat-grid-widget").showConfig();
                }},
                sep       : "---------",
                addrow    : {name: "Add Row", icon:"add-row", callback: function(key, opt){
                    opt.$trigger.data("dat-grid-widget").addRow();
                    return false;
                }},
                remrow    : {name: "Remove Row",icon:"rem-row", callback: function(key, opt){
                    opt.$trigger.data("dat-grid-widget").removeRow();
                    return false;
                }},
                addcol    : {name: "Add Column",icon:"add-col", callback: function(key, opt){
                    opt.$trigger.data("dat-grid-widget").addColumn();
                    return false;
                }},
                remcol    : {name: "Remove Column",icon:"rem-col", callback: function(key, opt){
                    opt.$trigger.data("dat-grid-widget").removeColumn();
                    return false;
                }}
            }
            // there's more, have a look at the demos and docs...
        });
            

        //
        //
        //////////////////////////////////////////////
    };
    
    
    fullEditor.prototype.addLayout=function(){
        
        // CREATE THE LAYOUT THAT SHOULD BE RENDERED INTO THE LAYOUTS CONTAINER
        var container = $("<div class='dat-grid-full-editor-layout-wrapper' />");
        this.layoutsElm.append(container);
        var layout = new DatGrid.Gridster({
            parent: container,
            gridster: {
                widget_base_dimensions: [this.cellWidth,this.cellHeight],
                widget_margins: this.cellMargin
            }
        });
        
        var self=this;
        

        
        this.layouts.push(layout);
        
        this.inspector.addLayout(layout);
        
        $(layout).on("widgetAdded",function(e,widget){
            console.log("TODO");
        });
                
    };
    
    /**
     *  WE LOOK FOR THE FIRST DISPLAYED LAYER ON THE STACK
     *  THEN WE SET IT DROPPABLE AND DISABLE THE DROP FOR ALL OTHERS
     */
    fullEditor.prototype.getTopLayer = function(){
        
        for( var i = this.layouts.length-1 ; i>=0 ; i--){
                        
            if(this.layouts[i].hidden == false )
                return this.layouts[i];
            
        }
        
        return false;
    };
    
    fullEditor.prototype.serialize = function(){
        
        var layouts = [];
        
        for(var i = 0 ; i < this.layouts.length ; i++){
           layouts.push(this.layouts[i].serialize());
        }
        
        return layouts;
        
    };

    DatGrid.FullEditor=fullEditor;
    
})();