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

// $(function() {
    $('form#newTask').on('submit', function(e) {
    	// console.log("Hello")
    	var formInput = $("#newTask").serializeArray();
    	console.log(formInput);
    	var postData = {};
    	for (var i = 0; i < formInput.length; i++) {
    		postData[formInput[i].name] = formInput[i].value;
    	}
    	postData['csrfmiddlewaretoken'] = ctoken;
    	console.log(postData);
        $.ajax({
	      method: "POST",
	      url: path,
	      data: postData,
	      success: function(data) {
	        console.log(data) // check out how data is structured
	        var newTask = document.createElement("li")
	        newTask.innerHTML =  data['title']
	        var divId = "category" + data.category
	        document.getElementById(divId).appendChild(newTask)

	        // Update the coin amount
	        // $('.status').contents()[0].textContent = 'Balance&nbsp'+data.coins
	      }, 
	      error: function(request) {
	      	console.log(request.responseText)
	      }
	    })
        e.preventDefault();
    });
// });

// function submitTask() {
// 	var newTask = $("#newTask").serialize();
// 	console.log(newTask)
// 	var elem = document.createElement("P")
// 	elem.innerHTML = "adsfa";
// 	document.getElementById("categoryContent").appendChild(elem);




// }