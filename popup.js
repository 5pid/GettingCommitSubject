chrome.extension.onMessage.addListener(function(request, sender) {
	switch(request.action) {
		case 'getStr':
			$('#_fullTitle').val(request.source);
			$('#_fullTitle').select();
			break;
	}
});

$(document).ready(function() {
	console.log('ready');
	chrome.tabs.executeScript(null, { file: "jquery-3.1.0.min.js" }, function() {
	    chrome.tabs.executeScript(null, { file: "atPage.js" }, function() {
	    	if(chrome.extension.lastError) {
				console.log('test');
			}
	    });
	});
});

$('#_copy').on('click', copy);

function copy() {
	$('#_fullTitle').select();
	try {  
		// Now that we've selected the anchor text, execute the copy command  
		var successful = document.execCommand('copy');  
		var msg = successful ? 'successful' : 'unsuccessful';  
		console.log('Copy email command was ' + msg);  
	} catch(err) {  
		console.log('Oops, unable to copy');  
	}  
}

