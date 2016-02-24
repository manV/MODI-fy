var regExpList = [];

wordlist.forEach(function(wordPair) {
    regExpList.push({
        re: new RegExp(wordPair[0], 'gi'),
        replaceWith: wordPair[1]
    });
});

setInterval(function() {
    replaceContent();
}, 30000);

replaceContent();

function replaceContent() {
    var elements = document.getElementsByTagName('*');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text;
                regExpList.forEach(function(regExp) {
                    replacedText = replacedText.replace(regExp.re, regExp.replaceWith);
                });

                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}
