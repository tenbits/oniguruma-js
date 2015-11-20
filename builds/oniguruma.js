(function(root, factory){
	"use strict";

	var isNode = (typeof window === 'undefined' || window.navigator == null);
	var global_ = isNode ? global : window;

	function construct(){
		var Onig = factory(global_);
		if (isNode) {
			module.exports = Onig;
			return;
		}
		return window.Onig = Onig;
	}

	if (typeof define === 'function' && define.amd) {
		return define(construct);
	}

	return construct();
}(this, function(global){
	"use strict";

	// import ../utils/lib/utils.embed.js

	// import ../Regex/src/utils/exports.es6
	// import ../Regex/src/Ast/exports.es6
	// import ../Regex/src/Nodes/exports.es6
	// import ../Regex/src/utils/exec.es6
	// import ../Regex/src/Handlers/exports.es6

	// import ../Regex/src/Match.es6
	// import ../Regex/src/Regex.es6

	// import ../src/Onig.es6
	return Onig;
}));