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
        
        // WHEN VISIBILITY CHANGES THEN WE HAVE TO CHECK WHICH LAYOUT IS ON THE TOP AND SET IT DROPPABLE WHILE WE ARE DISABLING THE OTHERS FOR DROP
        $(layout).on("displayChanged",function(e){
            self.changeDroppableLayout();
        });
        
        this.layouts.push(layout);
        
        this.inspector.addLayout(layout);
        
        $(layout).on("widgetAdded",function(e,widget){
            console.log("TODO");
        });
        
        $(layout).on("widgetModelDropped",function(e,model){
            e.target.addWidget(model);
        });
        
        this.changeDroppableLayout();
        
    };
    
    /**
     *  WE LOOK FOR THE FIRST DISPLAYED LAYER ON THE STACK
     *  THEN WE SET IT DROPPABLE AND DISABLE THE DROP FOR ALL OTHERS
     */
    fullEditor.prototype.changeDroppableLayout = function(){
        
        var found = false;
        
        for( var i = this.layouts.length-1 ; i>=0 ; i--){
            
            if(found || this.layouts[i].hidden == true ){
                this.layouts[i].setDroppable(false);
            }else{
                found = true;
                this.layouts[i].setDroppable(true);
                console.log(this.layouts[i]);
            }
            
        }
    };

    DatGrid.FullEditor=fullEditor;
    
})();