var categoryTabs;
var categoryContent;

window.onload = function () {
	// categoryTabs = document.getElementById("sidebar").getElementsByTagName("li");
	categoryTabs = document.getElementsByClassName("side"); // categoryTabs has one more element than categoryContent
	categoryContent = document.getElementById("categoryContent").getElementsByTagName("div");
}

function openCategory(category) {
	// console.log(category)
	// console.log(categoryTabs.length)
	if (category === "All") { 
		categoryTabs[0].classList.add("active");
	} else {
		categoryTabs[0].classList.remove("active");
	}
	for (var i = 0; i < categoryContent.length; i++ ) {
		if (category === "All") {
			categoryTabs[i+1].classList.remove("active");
			categoryContent[i].style.display = "block";
		} else if (categoryTabs[i+1].id === 'tab'.concat(category)) {
			categoryTabs[i+1].classList.add("active");
			categoryContent[i].style.display = "block";
			console.log("matched: " + category);
		} else {
			categoryTabs[i+1].classList.remove("active");
			categoryContent[i].style.display = "none";
			console.log("not matched: " + category);
		}
	}
}