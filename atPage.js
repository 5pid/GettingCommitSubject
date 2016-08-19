function getKey() {
	var $key = $('#key-val');
	return $key.text();
}

function getTitle() {
	var $title = $('#summary-val');
	return $title.text();
}

function getFullTitle() {
	var fullTitle = '[' + getKey() + '] ' + getTitle();
	return {
		success: fullTitle.trim() !== '[]',
		message: fullTitle.trim() === '[]' ? '이슈 보기 페이지에서만 사용 가능합니다.' : fullTitle
	};
}

$(document).ready(function() {
	chrome.extension.sendMessage({
	    action: "getCommitSubject",
	    source: getFullTitle()
	});	
});