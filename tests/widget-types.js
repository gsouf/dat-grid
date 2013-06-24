$(function(){
    
    DatGrid.registerWidgetType("textArea",{
        
        fields:{
            text         :       { type : "tinymce",      label : "Contenu" },
            autoheight   :       { type : "checkbox" ,    label : "Hauteur automatique" },
            background   :       { type : "powerpicture", label : "Image de fond" },
            "backgorund-color" : { type : "color",        label : "Couleur de fond" }
        },
        
        viewGetter:function(fields){
            return  "<div>"
                    +fields.text
                    +"</div>";
        }

    });

    
});