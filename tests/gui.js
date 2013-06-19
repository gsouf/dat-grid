$(function(){

// LOAD THE DEFAULT FIELD TYPES

    DatGrid.loadDefaultFieldTypes();


// REGISTERING SOME WIDGET TYPES

    DatGrid.registerWidgetType("cool",{
        fields:{
            wawa : { type :"text",label:"yo" },
            wowo : { 
                type : "checkbox",
                options: {
                    name : "blah"
                }
            },
            wewe : { type : "testtype" , options : {max : 6} }
        },
        viewGetter:function(fields){
            return "<div>"+fields.wawa+"</div>";
        }

    });


    DatGrid.registerWidgetType("slider",{
        fields:{
            imagesPool : { type :"text" , label :"pool d'images :" },
        },
        viewGetter:function(fields){
            return "<div>"+fields.wawa+"</div>";
        }

    });


// REGISTERING SOME FIELD TYPES

    DatGrid.registerFieldType("testtype",{
        valueGetter : function(){

        },
        viewGetter : function(value,options){
            return "this is a fake input with max : <b>"+options.max+"</b> and with value : <b>"+value+"</b>";
        }
    });





// CREATE THE TOOL BOX

    var myToolBox = new DatGrid.ToolBox({
        parent : "#toolBox"
    });


    myToolBox.addModel(
        new DatGrid.WidgetModel({
            name: "abc",
            width: 3,
            height: 2,
            type: "cool",
            iconCls: "batchicon-at"
        })
    );

    myToolBox.addModel(
        new DatGrid.WidgetModel({
            name: "Slider",
            width: 6,
            height: 1,
            type: "slider",
            iconCls: "batchicon-windows",
            widthLocked: false,
        })
    );

    myToolBox.attacheFilterField("#searchInToolBox");

    var myEditor  = new DatGrid.FullEditor({
        editorElm : ".gridster",
        inspectorElm : "#inspector",
        cellDimensions : [50,50],
        cellMargin : [5,5]
    });

    myEditor.addLayout();
    myEditor.addLayout();
    myEditor.addLayout();

    $('#saver').click(function(){console.log(myEditor.serialize());});


});
