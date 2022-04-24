// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../../addon/mode/simple"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../../addon/mode/simple"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";

    var nkeywords = ["begin",
		    "if", "then", "elseif", "endif",
		    "while", "do", "endwhile",
		    "repeat", "until", "endrepeat",
		    "case","from", "when", "endcase",
		     "transformer", "tr",
		     "operator", "op", "end"];

    var ntransformers = ["eachboth", "eachleft", "eachright", "each"];

    var nbuiltin = ["reshape", "tell", "count"];
	
    CodeMirror.defineSimpleMode("nial",{
	start: [
	    // Keywords
	    {regex: new RegExp("("+nkeywords.join('|')+")\\b"), token: "keyword"},
	    // Transformers
	    {regex: new RegExp("("+ntransformers.join('|')+")\\b"), token: "def"},
	    // Keywords
	    {regex: new RegExp("("+nbuiltin.join('|') + ")\\b"), token: "builtin"},
	    // Bool
	    //{regex: /([lo]*)\\b/, token: "atom"},
	    // Remark
	    {regex: /^[\s]*#.*$/, sol: true, token: "comment", next: "remark0"},
	    // Comment
	    {regex: /%([^;]*);/, token: "comment"},
	    // string
	    {regex: /'([^']*)'/, token: "string"},
	    // Keyword
	    {regex: /(tr|transformer|op|operator|is)/, token: "keyword"},
	    // variable
	    {regex: /[a-zA-Z_]\w*/, token: "variable"},
	    // Operator
	    {regex: /[-+\/*=<>!]+/, token: "operator"},
            // Number
	    {regex: /([0-9]+)(\.[0-9]*)?([Ee][+-]?[0-9]*)?/, token: "number"}
	],

	remark0: [
	    {regex: /^[\s]*[^\s].*$/, sol:true, token: "comment", next: "remark0"},
	    {regex: /^.*$/, sol: true, token: "blank", next: "start"}
	],
	
	meta: {
	    electricInput: /^\s*\}$/
	}
    });


    // https://github.com/WebAssembly/design/issues/981 mentions text/webassembly,
    // which seems like a reasonable choice, although it's not standard right now.
    CodeMirror.defineMIME("text/x-nialsrc", "nial");
    CodeMirror.defineMIME("text/nial", "nial");
    
    
});

			    
