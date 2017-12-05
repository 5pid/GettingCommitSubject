localStorage.usableFields = {
	issueKey : true,
	userName: false,
	issueTitle: true
};




// 이슈 필터에서 각 이슈 번호, 타이틀, 링크 가져오는 스크립트
function getIssuesLink() {
	var txt = [],
	i,
	issues = document.body.getElementsByClassName('issuerow'),
	host = 'http://' + window.location.host;

	for(i = 0; i < issues.length; i++) {
		var issue = issues[i].getElementsByClassName('summary')[0].getElementsByTagName('a')[0],
		key = issue.getAttribute('data-issue-key'),
		title = issue.innerHTML,
		link = host + issue.getAttribute('href');

		txt.push(getIssueFormat(key, title, link));
	}
	return txt.join('\n');
}

function getIssueFormat(key, title, link) {
	return '- ' + link;
}
