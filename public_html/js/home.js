$("document").ready( function() {   
    
    $("#button").click( function(e) {
        e.preventDefault();
        
        // Disable button until done
        $('#button').attr('disabled', 'disabled');
        
        $("#annexation-image").show();
        $("#dummy").hide();
        
        var mapPartArray = ["#map-part1", "#map-part2", "#map-part3", 
                            "#map-part4", "#map-part5", "#map-part6", 
                            "#map-part7", "#map-part8"];
        
        // Remove previous selections if any
        for(var i = 0; i < mapPartArray.length; i++) {
            $(mapPartArray[i]).removeClass("hovered");
        }
        
        
       /*
        * Validate input
        */
        var formvalid = true;
        var number = document.getElementById("number");
        
        // If native browser validation available  
        if(typeof number.willValidate !== "undefined") {
            if(!number.checkValidity()) {
                formvalid = false;
                alert("Please enter a 3 digit number");
                console.log("Number was not valid (checked by browser)");
            }
        // Native validation not available    
        } else {   
            number.validity = number.validity || {};
            var re = new RegExp("\d{3}");
            
            if(number.value.length !== 3) {
                formvalid = false;
                alert("Please enter a 3 digit number");
            } else if(!re.test(Number(number.value))) {
                formvalid = false;
                alert("Please enter numbers only");
            }
        }
        
        if(formvalid) {
            
            // Determine stopping area
            var offset;
            var burn = false;
            number = number.value;
            var lastDigit = number.slice(2, 3);
            if(number === "666") {
                offset = 3;
            } else if(lastDigit === "0") {
                offset = 1;
                burn = true;
            } else if(lastDigit === "1") {
                offset = 1;
            } else if(lastDigit === "2") {
                offset = 8;
            } else if(lastDigit === "3") {
                offset = 6;
            } else if(lastDigit === "4") {
                offset = 1;
            } else if(lastDigit === "5") {
                offset = 8;
            } else if(lastDigit === "6") {
                offset = 1;
                burn = true;
            } else if(lastDigit === "7") {
                offset = 1;
            } else if(lastDigit === "8") {
                offset = 8;
            } else if(lastDigit === "9") {
                offset = 6;
            }
            
            // Get random number
            var rand = Math.random() + 250;

            // Highlight each area for X number of seconds, incrementally getting 
            // longer and longer until it stops on an area
            var i = 0;
            var n = mapPartArray.length;
            var cur = 0;
            var end = (n * 2) + offset;
            function highlight() {
                // Stick within available id's
                if(i < n) {
                    // Run through id's end/n times
                    if(cur < end) {
                        //console.log(rand, i);
                        var curPart = mapPartArray[i];
                        $(curPart).toggleClass("hovered");
                        rand += 50;
                        i++;
                        cur++;
                        // Unhighlight if going to next one
                        if(cur !== end) {
                            setTimeout( function() {
                                $(curPart).toggleClass("hovered"); 
                            }, 500);
                        // Once stopped on area flash it then leave highlighted
                        } else {
                            if(burn) {
                                $(curPart).toggleClass("hovered");
                                $("#annexation-image").hide();
                                $("#dummy").show();
                            } else {
                                var j = 0;
                                function flash() {
                                    if(j < 6) {
                                        $(curPart).toggleClass("highlighted");
                                        j++;
                                        setTimeout(flash, 250);
                                    }
                                }
                                setTimeout(flash, 500);
                            }
                            // Done; enable button again
                            $('#button').removeAttr('disabled');
                        }
                        setTimeout(highlight, rand);
                    }
                } else {
                    i = 0;
                    setTimeout( highlight, 0);
                }
            }
            setTimeout(highlight, 0);
        // Form not valid, enable button again
        } else {
            $('#button').removeAttr('disabled');
        }
        
    });
    
});