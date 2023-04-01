CodeMirror.defineMode("mapl", function() {
    return {
        token: function(stream, state) {
            if (stream.match("leaf") ) {
                return "leaf";
            } else if (stream.match("seed") ) {
                return "seed";
            } else if (stream.match("branch") ) {
                return "branch";
            } else {
                stream.next();
                return null;
            }
        }
    };
});