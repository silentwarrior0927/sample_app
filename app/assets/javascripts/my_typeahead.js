$(document).ready(function(){

    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;
     
            // an array that will be populated with substring matches
            matches = [];
     
            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');
     
            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    // the typeahead jQuery plugin expects suggestions to a
                    // JavaScript object, refer to typeahead docs for more info
                    matches.push({ value: str });
                }
            });
     
            cb(matches);
        };
    };
     
    var debtors =  ['Caribbean Petroleum Corp', 
                    'Leiner Health Products Inc', 
                    'Vitro America Inc', 
                    'Personal Communications Devices LLC', 
                    'OCZ Technology Group Inc', 
                    'Savient Parmaceuticals Inc', 
                    'Trident Microsystems Inc', 
                    'Spheris Inc', 
                    'Vertis Holdings Inc', 
                    'Magic Brands LLC', 
                    'LCI Holding Company Inc', 
                    'First Place Financial Corp', 
                    'Fortunoff Fine Jewelry and Silverware LLC', 
                    'Cabrini Medical Center', 
                    'Fisker Automotive Holdings Inc', 
                    'MSD Performance Inc', 
                    'Constar International Holdings LLC', 
                    'HMX Acquisition Corp', 
                    'Boston Generating LLC', 
                    'WorldSpace Inc', 
                    'Taylor-Wharton International LLC', 
                    'VOSC Inc', 
                    'Coda Holdings Inc', 
                    'AmericanWest Bancorp', 
                    'Alexander Gallo Holdings LLC', 
                    'Blitz USA Inc', 
                    'AgFeed USA LLC', 
                    'Fuddruckers Inc', 
                    'LifeCare Hospitals LLC', 
                    'Victor Oolitic Stone Company', 
                    'Coda Automotive Inc',
                   ];
     
    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'Debtors',
        displayKey: 'value',
        source: substringMatcher(debtors)
    });

    // Submit form upon clicking on Typeahead.js suggestion
    $('.typeahead').bind("typeahead:selected", function () {
        $("#search_form").submit();
    });

});


// $(document).ready(function(){

//     var debtorSuggestions = new Bloodhound({
//         datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
//         queryTokenizer: Bloodhound.tokenizers.whitespace,
//         // prefetch: 'http://localhost:3000/data_pages/debtor_suggestions.json?q=%queryTokenizer',
//         remote: 'http://localhost:3000/data_pages/debtor_suggestions.json?q=%QUERY'
//         });
     
//     debtorSuggestions.initialize();
     
//     $('.typeahead').typeahead(null, {
//     name: 'debtor',
//     displayKey: 'debtor',
//     source: debtorSuggestions.ttAdapter()
//     });

// });