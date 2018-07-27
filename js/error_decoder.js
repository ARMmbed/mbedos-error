---
---
var type_arr = {{site.data.error.type | jsonify}}
var module_arr = {{site.data.error.module_type | jsonify}}
var error_arr = {{site.data.error.error_code | jsonify}}

function ShowErrorCodes(type,module_type,error_code){
	console.log("decoded info = "+type_arr[type]+","+module_arr[module_type]+","+error_arr[error_code] )

	if($('#error-instructions').css('display') == 'none'){
         $('#error-instructions').fadeIn();
    }

    // Fill in values
	$('#error_type').html(type_arr[type]);
	$('#module_type').html(module_arr[module_type]);
	$('#error_code').html(error_arr[error_code]);

}

function DecodeErrorCode(err){
	// TODO, impliment a function to decode error code
}



var params = [];
var hashes = window.location.href.replace(/#.+/,'').slice(window.location.href.indexOf('?') + 1).split('&');
for(var i = 0; i < hashes.length; i++)
{
    var hash = hashes[i].split('=');
    params[hash[0].toLowerCase()] = hash[1].toLowerCase();
    console.log(hash[0]+"="+hash[1])
};

console.log("------\n\rhashes = "+hashes)
console.log("------\n\rparams = "+params.toString())

if (typeof params['error'] != 'undefined') {
	console.log("decoding error code "+params['error'])
    ShowErrorCodes(decodeErrorCode(params['error']))
}
else if (typeof params['error_code'] != 'undefined') {
	console.log("decoding "+params['type']+","+params['module_type']+","+params['error_code'])
	ShowErrorCodes(params['type'],params['module_type'],params['error_code'])
}else {
	console.log("nothing found to decode. Continuing normally")
}

