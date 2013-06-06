var DatGrid = DatGrid || {};


(function(){
    
    var fullEditor=function(params){
        params=params || {};
        
        this.toolBoxElm  = params.toolBox;
        this.editorElm   = $(params.editorElm);
        this.overviewElm = params.overview;
        
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
        
        //
        //
        //////////////////////////////////////////////
    };
    
    
    fullEditor.prototype.addLayout=function(){
        var layout = new DatGrid.Gridster({
            parent: this.editorElm,
            gridster: {
                widget_base_dimensions: [this.cellWidth,this.cellHeight],
                widget_margins: this.cellMargin
            }
        });
        this.layouts.push(layout);
        
        $(layout).on("widgetAdded",function(e,widget){
            console.log("TODO");
        });
        


        
    };

    DatGrid.FullEditor=fullEditor;
    
})();