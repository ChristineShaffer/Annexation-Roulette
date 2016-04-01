$("document").ready( function() {   
    
    $("#button").click( function(e) {
        e.preventDefault();
        
        var mapPartArray = ["#map-part1", "#map-part2", "#map-part3", 
                            "#map-part4", "#map-part5", "#map-part6", 
                            "#map-part7"];
        
        // Get random number
        var rand = Math.random() + 1000;
        
        // Highlight each area for X number of seconds, incrementally getting 
        // longer and longer until it stops on an area
        var i = 0;
        var n = mapPartArray.length;
        function highlight() {
            if(i < n) {
                console.log(rand);
                var curPart = mapPartArray[i];
                $(curPart).toggleClass("hovered");
                rand += 100;
                i++;
                setTimeout( highlight, rand);
            }
        }
        setTimeout(highlight, 0);
        
        // Once stopped on area flash it then leave highlighted
        
    });
    
});