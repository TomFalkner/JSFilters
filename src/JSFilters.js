var JSFilters = JSFilters || {};

JSFilters.namespace = function(newNameSpace) {

    var names = newNameSpace.split('.');

    if (names[0] === 'JSFilters') {
        names = names.slice(1);
    }

    var currentLevel = JSFilters;

    for (var i = 0; i < names.length; i++) {
        if (typeof currentLevel[names[i]] === 'undefined') {
            currentLevel[names[i]] = {};
        }

        currentLevel = currentLevel[names[i]];
    }

    return currentLevel;

};