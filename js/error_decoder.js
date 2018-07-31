---
---
var type_arr = {{site.data.error.type | jsonify}}
var module_arr = {{site.data.error.module_type | jsonify}}
var error_arr = {{site.data.error.error_code | jsonify}}

function ShowErrorCodes(type,module_type,error_code){
	console.log("info looked up from error.yml = "+type_arr[type]+","+module_arr[module_type]+","+error_arr[error_code] )

	if($('#error-instructions').css('display') == 'none'){
         $('#error-instructions').fadeIn();
    }

    // Fill in values, check for undefined values
    if(typeof type_arr[type] !='undefined'){
    	$('#error_type').html(type_arr[type]);
    } else {
    	$('#error_type').html("This type has not been defined yet. Please let support@mbed.com know that there has been an issue.")
    }

    if(typeof module_arr[module_type] !='undefined'){
    	$('#module_type').html(module_arr[module_type]);
    } else {
 		$('#module_type').html("This type has not been defined yet. Please let support@mbed.com know that there has been an issue.")   	
    }

    if(typeof error_arr[error_code] !='undefined'){
    	$('#error_code').html(error_arr[error_code]);
    } else {
    	$('#error_code').html("This type has not been defined yet. Please let support@mbed.com know that there has been an issue.")
    }

}

function DecodeErrorCode(err){
	console.log("Decoding err : "+err)
	// values taken from mbed_error.h
	// mbed_error_status_t Status Encoding
	//|31(1 bit) Always Negative|30-29(2 bits)  |28-24              | 23-16(8 bits) |  15-0(16 bits) |
	//|-1                       |TYPE           |(unused/reserved)  | MODULE TYPE   |  ERROR CODE    |
	var CODE_MASK           = (0x0000FFFF)
	var CODE_POS            = (0)
	var CODE_FIELD_SIZE     = (16)

	var MODULE_MASK         = (0x00FF0000)
	var MODULE_POS          = (16)
	var MODULE_FIELD_SIZE   = (8)

	var TYPE_MASK           = (0x60000000)
	var TYPE_POS            = (29)
	var TYPE_FIELD_SIZE     = (2)

	// calculate values
	var error_code  = ((err & CODE_MASK)  >> CODE_POS)
	var module_type = (err & MODULE_MASK) >> MODULE_POS
	var type 		= (err & TYPE_MASK)   >> TYPE_POS

	console.log("Decoded Error Code: "+type+","+module_type+","+error_code)
	var ret = {
				'type':type,
				'module_type':module_type,
				'error_code':error_code
	}

	// ga('send', 'unified', {'error_code':error_code});
	// ga('send', 'split', {'module_type':module_type});
	// ga('send', 'split', {'type':type});
	// ga('send', 'split', {'err':err});
	// ga('send', {
	//   hitType: 'errorDecode',
	//   eventCategory: 'single',
	//   eventValue: err
	// });

	gtag('event', 'foo', {
	     'err': err,
	     'type': type,
	     'module_type': module_type,
	     'error_code' : error_code,
	 });

	return(ret)

}



document.getElementById('error-search').onkeydown = function SearchBox(event){
	// console.log("event.keyCode ="+event.keyCode)
	if (event.keyCode == 13) {
		var err = $('#error-search').val()
		// console.log("err = "+err)
        // console.log('running search box on '+err)
		var x = DecodeErrorCode(err)
	    ShowErrorCodes(x['type'],x['module_type'],x['error_code'])
    }

}

var params = [];
var hashes = window.location.href.replace(/#.+/,'').slice(window.location.href.indexOf('?') + 1).split('&');
for(var i = 0; i < hashes.length; i++)
{
    var hash = hashes[i].split('=');
    if(typeof hash[1] != 'undefined'){ // safety check added to bypass error on normal loading of page
    	params[hash[0].toLowerCase()] = hash[1].toLowerCase();
    	console.log(hash[0]+"="+hash[1])
	}
};

console.log("------\n\rhashes = "+hashes)
console.log("------\n\rparams = "+params.toString())

if (typeof params['error'] != 'undefined') {
	console.log("decoding error code "+params['error'])
	var x = DecodeErrorCode(params['error'])
    ShowErrorCodes(x['type'],x['module_type'],x['error_code'])
}
else if (typeof params['error_code'] != 'undefined') {
	console.log("decoding "+params['type']+","+params['module_type']+","+params['error_code'])
	ShowErrorCodes(params['type'],params['module_type'],params['error_code'])
}else {
	console.log("nothing found to decode. Continuing normally")
}

