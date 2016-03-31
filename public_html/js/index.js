$("document").ready( function() {   
    
    $("#button").click( function(e) {
        e.preventDefault();
        
        var mapPartArray = ["#map-part1", "#map-part2", "#map-part3"];
        
        // Get random number
        
        // Highlight each area for X number of seconds, incrementally getting 
        // longer and longer until it stops on an area
        
        // Once stopped on area flash it then leave highlighted
        
        $("#map-part1").toggleClass("hovered");
        
    });
    
});