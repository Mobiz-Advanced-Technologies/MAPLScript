CodeMirror.defineMode("mapl", function() {
    return {
        token: function(stream, state) {
            if (stream.match(/\".*?\"/)) {
                return "string";
            } else if (stream.match("leaf") ) {
                return "leaf";
            } else if (stream.match("seed") || stream.match("if") || stream.match("then") || stream.match("print")) {
                return "seed";
            } else if (stream.match("branch") ) {
                return "branch";
            } else if (stream.match("mark") ) {
                return "mark";
            } else {
                stream.next();
                return null;
            }
        }
    };
});
