

// window.onload = function () {

// }

function openCategory(category) {
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

function addCategory() {
	var popup = document.getElementById("newCategory");
	popup.style.display = "block";
}

function showCategories() {
	var dropDown = document.getElementById("categoryDropDown");
	var dropDownBox = document.getElementById("newDropDownBox");

	if (dropDownBox.style.display === "block") {
		dropDownBox.style.display = "none";
		dropDown.style.border = "none";
	} else {
		dropDownBox.style.display = "block";
		dropDown.style.border = "1px solid rgba(50, 152, 207, 0.4)";
	}
}

// window.onclick = function(event) {
	// probably use class 
// }

// $(function() {
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
      	// $('#listNames').load("/tasklist");
        var newTask = document.createElement("li");
        newTask.className += "task";
        newTask.id = "taskDiv" + data["id"]
        var name = "check" + data["id"];
        var imgId = "task" + data["id"];
        var boxId = "ddtask" + data["id"];

        // create <a class="taskLink>"
        var newTaskLink = document.createElement('a');
        newTaskLink.className += "taskLink"; 

        //create <input type="checkbox">
        var newCheckbox = document.createElement("input");
        newCheckbox.type ="checkbox";
        newCheckbox.id = name;
        newCheckbox.name = name;

        //create label
        var newLabel = document.createElement("label");
        newLabel.htmlFor = name;

        //create title
        var newTitle = document.createElement("span");
        newTitle.innerHTML = " " + data["title"]

        //create ellipsis
        var newEllipsis = document.createElement("img");
        newEllipsis.src ="/static/ellipsis.svg";
        newEllipsis.className += "ellipsis";
        newEllipsis.id = imgId;

        //create dropdownbox
        var newDropDownBox = document.createElement("div");
        newDropDownBox.className += "dropDownBox taskDropDown";
        newDropDownBox.id = boxId;

        //create dropdownlist
        var newDropDownList = document.createElement("ul");
        newDropDownList.className += "dropDownList";

        //create new li
        var newLi = document.createElement("li");
        newLi.innerHTML += "<a class=\"dropDownItem\">Delete</a>";


        newDropDownList.appendChild(newLi);

        newDropDownBox.appendChild(newDropDownList);

        newTaskLink.appendChild(newCheckbox);
        newTaskLink.appendChild(newLabel);
        newTaskLink.appendChild(newTitle);
        newTaskLink.appendChild(newEllipsis);

        newTask.appendChild(newTaskLink);
        newTask.appendChild(newDropDownBox);
        console.log(newTask)

		//<li><a class="dropDownItem">Delete</a></li>';
        // console.log(newTask.innerHTML)
		
        var divId = "category" + data["category"];
        var parentDiv =  document.getElementById(divId);
        console.log(parentDiv)
        var index = parentDiv.children.length-1;
        parentDiv.insertBefore(newTask, parentDiv.children[index])

        // clear form input after submitting
        var form = document.getElementById("newTask");
        form.reset();
        var selected = document.getElementById("selectedCategory");
		selected.innerHTML = "List&nbsp;&nbsp;";
      }, 
      error: function(request) {
      	console.log(request.responseText)
      }
    })
    e.preventDefault();
});


$(document).on('submit', '#newList', function(e) {
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
        newList.setAttribute("id", "category" + data['id']);
        newList.className += "catDetails";
        newList.innerHTML =  "<h1>" + data['name'] + "</h1><br>";
        var parentDiv =  document.getElementById("listNames");
        parentDiv.appendChild(newList);

        //add new list on dropdown
        var taskCategorySelect = document.getElementById("taskCategory");
        var newOption = document.createElement("option");
        newOption.value = data["id"];
        newOption.innerHTML = data["name"];
        taskCategorySelect.appendChild(newOption);
        var newTaskDropDown = document.getElementById("newTaskDropDown");
        var newDropDownItem = document.createElement("li");
        newDropDownItem.innerHTML = "<a class=\"dropDownItem\" id=\"newTaskC" + data["id"] + "\">" + data['name'] + "</a>";
        newTaskDropDown.appendChild(newDropDownItem);

        openCategory(data['name']);

      }, 
      error: function(request) {
      	console.log(request.responseText);
      }
    });
    e.preventDefault();
});

$('.close').on('click',function(e) {
	var popup = document.getElementById("newCategory");
	popup.style.display = "none";
});

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

$(".taskList").on("click", ".dropDownItem", function(e) {
	var deleteId = e.target.parentElement.parentElement.parentElement.id.substring(6);
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
			// $('#listNames').load("/tasklist");
		},
		error: function(request) {
			console.log(request.responseText);
		},
	});
	e.preventDefault();
});


$(".side").on("click", ".dropDownItem", function(e) {
	var deleteId = e.target.parentElement.parentElement.parentElement.id.substring(6);
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
			var elem = document.getElementById("category" + deleteId);
			elem.parentNode.removeChild(elem);
			elem = document.getElementById("tab" + deleteId);
			elem.parentNode.removeChild(elem);
		},
		error: function(request) {
			console.log(request.responseText);
		},
	});
	e.preventDefault();
});


$("#newTaskDropDown").on("click", ".dropDownItem", function(e) {
	var id = e.target.id.substring(8);
	var selected = document.getElementById("selectedCategory");
	selected.innerHTML = e.target.innerHTML;
	var dropDown = document.getElementById("categoryDropDown");
	var dropDownBox = document.getElementById("newDropDownBox");
	dropDown.style.border = "none";
	dropDownBox.style.display = "none";
	console.log("id is " + id);
	$('#taskCategory').val(id);
});


$('.side').on('click', ".ellipsis", function(e) {
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

// #('.drop')





// });

// function submitTask() {
// 	var newTask = $("#newTask").serialize();
// 	console.log(newTask)
// 	var elem = document.createElement("P")
// 	elem.innerHTML = "adsfa";
// 	document.getElementById("categoryContent").appendChild(elem);




// }