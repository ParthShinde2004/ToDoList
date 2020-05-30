// window.onload = function () {

// }

// Open category tab
function openCategory(category) {
	console.log("category is " + category);
	var categoryTabs = document.getElementsByClassName("side"); // categoryTabs has one more element than categoryContent
	var categoryContent = document.getElementById("categoryContent").getElementsByClassName("catDetails");

	if (category === "All") { 
		categoryTabs[0].classList.add("active");
	} else {
		categoryTabs[0].classList.remove("active");
	}
	for (var i = 0; i < categoryContent.length; i++ ) {
		// if category chosen is all, remove active from all other tabs and show all content
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


function getCurrentCategory() {
	categoryTabs = document.getElementsByClassName("side active"); // categoryTabs has one more element than categoryContent
	category = "All";
	category = categoryTabs[0].id
	return category;
}

// Open up pop window for adding new category(list)
$(document).on("click", "#tabNewCategory", function() {
	var popup = document.getElementById("newCategory");
	popup.style.display = "block";
});

// Hightlight category tab when it is clicked
$(document).on("click", "#categoryDropDown", function() {
	console.log("choosing category for new task");	
	var dropDown = document.getElementById("categoryDropDown");
	var dropDownBox = document.getElementById("newDropDownBox");

	if (dropDownBox.style.display === "block") {
		dropDownBox.style.display = "none";
		dropDown.style.border = "none";
	} else {
		dropDownBox.style.display = "block";
		dropDown.style.border = "1px solid rgba(50, 152, 207, 0.4)";
	}
});

// Create new task and display it
$(document).on('submit', '#newTask', function(e) {
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
      	// reload task lists
      	$('#listNames').load("/tasklist", function() {
      		// clear form input after submitting
	        var form = document.getElementById("newTask");
	        form.reset();
	        var selected = document.getElementById("selectedCategory");
			selected.innerHTML = "List&nbsp;&nbsp;";
			openCategory(data["category"])
      	});
      }, 
      error: function(request) {
      	console.log(request.responseText)
      }
    })
    e.preventDefault();
});

// Create new list and display it
$(document).on('submit', '#newList', async function(e) {
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
		$("#listTabs").load("/categorylist", function() {
			$("#listNames").load("/tasklist", function() {
				$('#newTask').load("/textarea", function() {
					openCategory(data['id']);
				});
			});
		});
		
      }, 
      error: function(request) {
      	console.log(request.responseText);
      }
    });
    e.preventDefault();
});

// Close pop up window for adding new list
$('.close').on('click',function(e) {
	var popup = document.getElementById("newCategory");
	popup.style.display = "none";
});

// Show or hide dropdown box of a task when the ellipsis icon is clicked
$('.taskList').on('click', ".ellipsis", function(e) {
	console.log("here")
	var dropDown = document.getElementById('dd'+e.target.id);
	if (dropDown.style.display === "block") {
		dropDown.style.display = "none";
		e.target.classList.remove("active");
	} else {
		dropDown.style.display = "block";
		e.target.classList.add("active");
	}
});

// Delete task when the delete button is clicked
$(".taskList").on("click", ".dropDownItem", function(e) {
	var deleteId = e.currentTarget.parentElement.parentElement.parentElement.id.substring(6);
	// deleteData['csrfmiddlewaretoken'] = ctoken;
	$.ajax({
		method: "DELETE",
		url: "delete_task/" + deleteId,
		// data: deleteData,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("X-CSRFToken", ctoken);
		},
		success: function(data) {
			console.log(data["deleted"]);
			var elem = document.getElementById("taskDiv" + deleteId);
			elem.parentNode.removeChild(elem);
		},
		error: function(request) {
			console.log(request.responseText);
		},
	});
	e.preventDefault();
});

// Show or hide dropdown box of a category tab when the ellipsis icon is clicked
$('#listTabs').on('click', ".ellipsis", function(e) {
	console.log("side ellipsis clicked")
	var dropDown = document.getElementById('dd'+e.target.id);
	if (dropDown.style.display === "block") {
		dropDown.style.display = "none";
		e.target.classList.remove("active");
	} else {
		dropDown.style.display = "block";
		e.target.classList.add("active");
	}
});

// Delete category(list) when the delete button is clicked
$("#sidebar").on("click", ".dropDownItem", function(e) {
	var deleteId = e.currentTarget.parentElement.parentElement.parentElement.id.substring(6);
	console.log("list delete id is " + deleteId);
	// deleteData['csrfmiddlewaretoken'] = ctoken;
	$.ajax({
		method: "DELETE",
		url: "delete_list/" + deleteId,
		// data: deleteData,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("X-CSRFToken", ctoken);
		},
		success: function(data) {
			console.log(data["deleted"]);
			$("#listTabs").load("/categorylist");
			$("#listNames").load("/tasklist");
			$('#newTask').load("/textarea");
		},
		error: function(request) {
			console.log(request.responseText);
		},
	});
	e.preventDefault();
});

// Select category when the corresponding link is clicked
$("#newTask").on("click", ".dropDownItem", function(e) {
	var id = e.target.id.substring(8);
	console.log("ID is " + id);
	var selected = document.getElementById("selectedCategory");
	selected.innerHTML = e.target.innerHTML;
	var dropDown = document.getElementById("categoryDropDown");
	var dropDownBox = document.getElementById("newDropDownBox");
	dropDown.style.border = "none";
	dropDownBox.style.display = "none";
	console.log("id is " + id);
	$('#taskCategory').val(id);
});


// Show the content of a category tab when the tab is clicked
$('#listTabs').on('click', 'a', function(e) {
	console.log("side tabs clicked");
	var category = e.target.parentElement.id.substring(3);
	if (category === "") {
		category = e.target.parentElement.parentElement.id.substring(3);
	}
	openCategory(category);
});

$('.taskList').on('change', 'input:checkbox', function(e) {

	var taskId = e.target.id.substring(5);
	var putData = {};
	putData['taskId'] = taskId;
	// putData['csrfmiddlewaretoken'] = ctoken;
	$.ajax({
		method: "PUT",
		url: "check_task/" + taskId,
		data: putData,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("X-CSRFToken", ctoken);
		},
		success: function(data) {
      		console.log("success");
      		currentTab = getCurrentCategory().substring(3);
      		$('#listNames').load("/tasklist", function() {
      			openCategory(currentTab);
      		});
      		

		
	    }, 
	    error: function(request) {
	    	console.log(request.responseText);
	    }
    });
});



