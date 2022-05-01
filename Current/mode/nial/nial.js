// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
	mod(require("../../lib/codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
	define(["../../lib/codemirror"], mod);
    else // Plain browser env
	mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";
    
    CodeMirror.defineMode("nial", function() {
	function words(str) {
	    var obj = {}, words = str.split(" ");
	    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
	    return obj;
	}
	var keywords = words(
	    "is op operator tr transformer " +
		"begin end " +
		"if then else elseif endif " +
		"while do endwhile " +
		"for with endfor " +
		"repeat until endrepeat " +
		"case from endcase ");

	var atoms = {"null": true};

	var isOperatorChar = /[+\-*&%=<>!|\/]/;

	function tokenBase(stream, state) {

	    var atSol = stream.sol();
	    var ch = stream.next();

	    if (state.inremark == true) {
			stream.skipToEnd();
			return "comment";
	    }
	    
	    if (ch == "#" && atSol) {
			stream.skipToEnd();
			state.inremark = true;
		return "comment";
	    }

	    // Characters
	    if (ch == "`") {
			var mc = stream.next();
			return "atom";
	    }

	    // Phrases and faults
	    if (ch == '"' || ch == '?') {
			stream.eatWhile(/[\w_\.\$]/);
      		return "atom";
	    }

	    // Strings
	    if (ch == "'") {
		state.tokenize = tokenString(ch);
		return state.tokenize(stream, state);
	    }

	    // Comment
	    if (ch == "%") {
		state.tokenize = tokenComment;
		return tokenComment(stream, state);
	    }
	    
	    if (/[\[\]\(\),;\:\.]/.test(ch)) {
		return null;
	    }
	    
	    if (/\d/.test(ch)) {
		stream.eatWhile(/[\w\.]/);
		return "number";
	    }
	    
	    if (isOperatorChar.test(ch)) {
		stream.eatWhile(isOperatorChar);
		return "operator";
	    }
	    
	    stream.eatWhile(/[\w\$_]/);
	    var cur = stream.current();
	    if (/^[loLO]+$/.test(cur)) return "number";
	    if (keywords.propertyIsEnumerable(cur.toLowerCase())) return "keyword";
	    if (atoms.propertyIsEnumerable(cur.toLowerCase())) return "atom";
	    return "variable";
	}

	function tokenString(quote) {
	    return function(stream, state) {
		var escaped = false, next, end = false;
		while ((next = stream.next()) != null) {
		    if (next == quote && !escaped) {end = true; break;}
		    escaped = !escaped && next == "\\";
		}
		if (end || !escaped) state.tokenize = null;
		return "string";
	    };
	}

	function tokenComment(stream, state) {
	    var ch;
	    while (ch = stream.next()) {
		if (ch == ";") {
		    state.tokenize = null;
		    break;
		}
	    }
	    return "comment";
	}

	// Interface

	return {
	    startState: function() {
		return {tokenize: null, inremark: false};
	    },
	    
	    blankLine: function (state) {
		if (state.inremark) {
		    state.inremark = false;
		}
	    },
	
	    token: function(stream, state) {
		if (stream.eatSpace()) return null;
		var style = (state.tokenize || tokenBase)(stream, state);
		if (style == "comment" || style == "meta") return style;
		return style;
	    },
	    
	    electricChars: "{}"
	};
    });
    
    CodeMirror.defineMIME("text/x-nial", "nial");
    
});
