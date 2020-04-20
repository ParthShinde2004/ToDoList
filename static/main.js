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

function addCategory() {
	var popup = document.getElementById("newCategory");
	popup.style.display = "block";
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
      url: taskPath,
      data: postData,
      success: function(data) {
        // console.log(data) // check out how data is struct
        var newTask = document.createElement("li")
        newTask.innerHTML =  data['title']
        var divId = "category" + data.category
        var parentDiv =  document.getElementById(divId);
        // parentDiv.appendChild(newTask)
        var index = parentDiv.children.length-1;
        parentDiv.insertBefore(newTask, parentDiv.children[index])
      }, 
      error: function(request) {
      	console.log(request.responseText)
      }
    })
    e.preventDefault();
});


$('form#newList').on('submit', function(e) {
	// console.log("Hello")
	var formInput = $("#newList").serializeArray()[0];
	console.log(formInput);
	var postData = {};
	// postData[formInput[]]
	postData[formInput.name] = formInput.value
	postData['csrfmiddlewaretoken'] = ctoken;
    $.ajax({
      method: "POST",
      url: listPath,
      data: postData,
      success: function(data) {
      	// close popup window
      	var popup = document.getElementById("newCategory");
		popup.style.display = "none";

		// add new list on sidebar
		var newCategory = document.createElement("li");
		newCategory.setAttribute("class", "side");
		var newId = "tab" + data['name'];
		newCategory.setAttribute("id", newId);
		newCategory.innerHTML = "<a onclick=\"openCategory(" + data['name'] + ")\">" + data['name'] + "</a>";
		var parentDiv =  document.getElementById("listTabs");
        var index = parentDiv.children.length-1;
        parentDiv.insertBefore(newCategory, parentDiv.children[index])

        //add list content
        // var divId = "category" + data.category
        var newList = document.createElement("div");
        newList.setAttribute("id", "category" + data['name']);
        newList.innerHTML =  "<h1>" + data['name'] + "</h1><br>";
        var parentDiv =  document.getElementById("listNames");
        parentDiv.appendChild(newList);

        openCategory(data['name']);



      	// console.log(newCategory.innerHTML);

      }, 
      error: function(request) {
      	console.log(request.responseText)
      }
    })
    e.preventDefault();
});

$('.close').on('click',function(e) {
	var popup = document.getElementById("newCategory");
	popup.style.display = "none";
});



// });

// function submitTask() {
// 	var newTask = $("#newTask").serialize();
// 	console.log(newTask)
// 	var elem = document.createElement("P")
// 	elem.innerHTML = "adsfa";
// 	document.getElementById("categoryContent").appendChild(elem);




// }