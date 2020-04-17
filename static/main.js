var categoryTabs;
var categoryContent;

window.onload = function () {
	// categoryTabs = document.getElementById("sidebar").getElementsByTagName("li");
	categoryTabs = document.getElementsByClassName("side");
	categoryContent = document.getElementById("categoryContent").getElementsByTagName("div");
}

function openCategory(category) {
	// console.log(category)
	// console.log(categoryTabs.length)
	for (var i = 0; i < categoryTabs.length; i++ ) {
		if (categoryTabs[i].id == 'tab'.concat(category)) {
			categoryContent[i].style.display = "block"
			console.log("matched: " + category)
		} else {
			categoryContent[i].style.display = "none"
			console.log("not matched: " + category)
		}
	}
}