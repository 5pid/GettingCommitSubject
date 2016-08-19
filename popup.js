var $commitSubject = $('#_fullTitle'),
	$copyButton = $('#_copy');

chrome.extension.onMessage.addListener(function(request, sender) {
	var response = request.source;

	switch(request.action) {
		case 'getCommitSubject':
			if(response.success) {
				$commitSubject.val(response.message);
				$commitSubject.select();	
			} else {
				$commitSubject.val(response.message).addClass('disabled').blur();
				$copyButton.addClass('disabled');
			}
			break;
	}
});

$(document).ready(function() {
	// 페이지에서 아직 값을 안가져왔을 경우를 위해 로딩 추가
	$commitSubject.val('loading page..').blur().addClass('disabled');
	$copyButton.addClass('loading');

	// 스크립트 인젝션
	chrome.tabs.executeScript(null, { file: "jquery-3.1.0.min.js" }, function() {
	    chrome.tabs.executeScript(null, { file: "atPage.js" }, function() {
	    	// 인젝션 성공 후
	    	$commitSubject.val('').removeClass('disabled');
	    	$copyButton.removeClass('loading');

	    	// 인젝션 실패
	    	if(chrome.extension.lastError) {
				$commitSubject.val("There was an error injecting script").addClass('disabled').blur();
				$copyButton.addClass('disabled');
				console.log(chrome.extension.lastError.message);
			}
	    });
	});
});

$copyButton.on('click', function() {
	$commitSubject.select();
	try {  
		// Now that we've selected the anchor text, execute the copy command  
		var successful = document.execCommand('copy');  
		var msg = successful ? 'successful' : 'unsuccessful'; 
		$copyButton.text(msg);

		console.log('Copy email command was ' + msg);  
	} catch(err) {  
		console.log('Oops, unable to copy');  
	}  
});
1
