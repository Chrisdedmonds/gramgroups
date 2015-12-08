

function Group(name){
	this.name = name;
	this.members = [];
}

function createGroup(x){
	console.log(x);
	var x = new Group(x);
	groupArray.push(x);
	updateBadge();
	updateGroupList();
}

function addToGroup(b) {
	console.log("It worked!");
	console.log(temp1[b]);

	document.getElementById('add_to_group_modal').innerHTML = '';
	if(groupArray.length===0) {
		document.getElementById('add_to_group_modal').innerHTML= '<li class="list-group-item">No groups yet</li>';
	} else {
		for(var g=0; g<groupArray.length;g++)
		{
			var target = groupArray[g];
			document.getElementById('add_to_group_modal').innerHTML += '<li class="list-group-item">' + target.name +'<button type="button" class="btn btn-primary" onClick="add(\'' + g + '\', \'' + b +'\')" id="add_user">Add</button></li>';
		}
	}
	document.getElementById('add_to_group_modal').innerHTML += '<li class="list-group-item">Add user to new group<button type="button" class="btn btn-success" onClick=addToNewGroup(\'' + b +'\') id="add_new"><img src="images/add_icon_3.png" height="15px"></button></li>';
	document.getElementById('add_to_group_modal').innerHTML += '<button type="button"class="btn" data-dismiss="modal" id="close_add">Close</button>'
	
}

function addMediaToGroup(f){
	console.log(temp3[f]);
	document.getElementById('add_to_group_modal').innerHTML= '';
	if (groupArray.length===0){
		document.getElementById('add_to_group_modal').innerHTML= '<li class="list-group-item">No groups yet</li>';
	} else {
		for(var w=0; w<groupArray.length;w++)
		{
			document.getElementById('add_to_group_modal').innerHTML += '<li class="list-group-item">' + groupArray[w].name +'<button type="button" class="btn btn-primary" onClick="addMedia(\'' + w + '\', \'' + f +'\')" id="add_media">Add</button></li>';
		}
	}
	document.getElementById('add_to_group_modal').innerHTML += '<li class="list-group-item">Add user to new group<button type="button" class="btn btn-success" onClick=addMediaToNewGroup(\'' + f +'\') id="add_media_new"><img src="images/add_icon_3.png" height="15px"></button></li>';
	document.getElementById('add_to_group_modal').innerHTML += '<button type="button"class="btn" data-dismiss="modal" id="close_add_media">Close</button>'	
}

function editNameForm(ind){
	$('.edit_modal').modal('toggle');
	$('#edit_modal_content').html('');
	$('#edit_modal_content').append('<form class="form actions" id="edit_group_form"><input type="text" class="form-control" placeholder="New name" id="new_group_name" value="'+groupArray[ind].name+'" /><br /><button type="button" class="btn btn-primary" id="change">Submit</button><button type="button" class="btn" id="close_edit">Close</button></form>');
	$('#change').click(function(){
		groupArray[ind].name = document.getElementById('new_group_name').value; 
		updateGroupList();
	});	
	$('#close_edit').click(function(){
		$('.edit_modal').modal('hide');
	});	
}

function viewGroup(y){
	$('#group_title').text('');
	$('#view_group_modal').html('');
	$('#group_title').text(''+groupArray[y].name+'');
	if(groupArray[y].members.length===0) {
		$('#view_group_modal').append('<li class="list-group-item">This group has no members</li>');
	} else {
		for(var p=0;p<groupArray[y].members.length;p++)
		{
			$('#view_group_modal').append('<li class="list-group-item"><a href="https://instagram.com/'+groupArray[y].members[p].username+'/" target="_blank">'+groupArray[y].members[p].username+'</a><img src="images/delete_icon_2.png" height="20px" id="delete_'+p+'" onClick="deleteMember(\'' + p + '\', \'' + y +'\')" ></li>');
		}
		$('#view_group_modal').append('');
	}
}

function deleteMember(v,b){
	if(confirm("Are you sure you want to delete this user from the group?")) {
		$('#delete_'+v+'').parent().remove();
		groupArray[b].members.splice(v,1);
		updateGroupList();
	}
}



function add( q , w ){
	console.log(temp1[w].username);
	console.log(groupArray[q].members);
	groupArray[q].members.push(temp1[w]);
	console.log(groupArray[q].members);
	updateGroupList();
}

function addMedia(j,k){
	console.log(temp3[k].user);
	groupArray[j].members.push(temp3[k].user);
	updateGroupList();
}

function addToNewGroup(p){
	createGroup("New");
	groupArray[(groupArray.length)-1].members.push(temp1[p]);
	updateGroupList();
}

function addMediaToNewGroup(o){
	createGroup("New");
	groupArray[(groupArray.length)-1].members.push(temp3[o].user);
	updateGroupList();
}

function deleteThis(d){
	if(confirm("Are you sure you want to delete this group?")) {
		$('#delete_group').closest("li").remove();
		groupArray.splice(d,1);
		updateBadge();
		updateGroupList();
	}
}




var searchUsernames = function(username_query) {
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/users/search?q=" + username_query + "&access_token=1098874542.200a0fc.34d68bea70e34a5082e6f9b6e92e8f2b",
		data: {
			q: username_query,
			count: 20
		},
		success: function(response) {
			console.log(username_query);
			console.log(response);
			console.log(response.data);
			temp1 = response.data;
			JSON.stringify(temp1);

				/* need to clear out previous search results here */
			document.getElementById("search_review").innerHTML = '';
			document.getElementById("search_review").innerHTML += '<h4>Showing results for "'+ username_query +'" </h4>';
				/* ATTEMPTED CLEAR OUT */
			document.getElementById("search_results_list").innerHTML = '';
			for(var j = 0; j < temp1.length; j++)
			{
				var name = temp1[j].username;
				document.getElementById("search_results_list").innerHTML += '<li class="list-group-item"><a href="https://instagram.com/'+name+'/" target="_blank"><h3>' + temp1[j].username + '</h3></a><img id="profile_picture" src="' + temp1[j].profile_picture + '" alt="profile picture" height="100px"><button type="button" class="btn btn-primary" data-toggle="modal" data-target=".add_to_group_modal" onClick="addToGroup(\''+j+'\')">Add to Group</button><button type="button" class="btn btn-primary" data-toggle="modal" data-target=".view_recent_modal" onClick="viewRecent(\''+temp1[j].id+'\')">View Recent Posts</button></li>';
			}
			
		}
	})
}

var viewRecent = function(name) {
	console.log(name);
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/users/"+name+"/media/recent/?access_token=1098874542.200a0fc.34d68bea70e34a5082e6f9b6e92e8f2b",
		data: {
			count: 20
		},
		success: function(response) {
			var temp2 = response.data;
			document.getElementById("view_recent_windowpane").innerHTML = '';
			console.log(response.meta.error_message);
			if (response.meta.error_message==="you cannot view this resource") {
				document.getElementById("view_recent_windowpane").innerHTML = '<h3>This user has a private account</h3>';
			} else if (temp2.length===0) {
				document.getElementById("view_recent_windowpane").innerHTML += '<h3> - Recent posts not available - </h3>';
			} else {
				for(var i = 0; i < temp2.length; i++) 
				{
					var created_time = parseInt(temp2[i].created_time);
					var y = new Date(created_time*1000);
					var yWrapper = moment(y);
					var picCaption = "";
					if (temp2[i].caption===null) {
						picCaption = "";
					} else {
						picCaption = temp2[i].caption.text;
					}

					var tagList = "";
					if (temp2[i].tags.length===0) {
						tagList = "none";
					}
					for(var p = 0; p < 5 ; p++)
					{
						if (p >= temp2[i].tags.length) {
							break;
						}
					tagList = tagList + temp2[i].tags[p] + " ";
					}
					document.getElementById("view_recent_windowpane").innerHTML += '<div class="thumbnails"><a href="'+ temp2[i].link +'" target="_blank"><img src='+ temp2[i].images.low_resolution.url +' width="250px"></a><div class="caption"><p>'+ picCaption+'</p><p title="Likes">'+ temp2[i].likes.count +" "+'<img src="images/like_icon.png" height="15px" title="Likes" id="like"></p><p>Tags: '+ tagList +'</p><p>Posted '+ yWrapper.fromNow() +'</p></div></div>';
				}
			}
			
		}
	})
}

var searchMediaTags = function(tag_query) {
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/tags/" + tag_query + "/media/recent?access_token=1098874542.200a0fc.34d68bea70e34a5082e6f9b6e92e8f2b",
		data: {
			count: 20
		},
		success: function(response) {
			console.log(tag_query);
			console.log(response);
			console.log(response.data);
			temp3 = response.data;
			document.getElementById("search_results_list_2").innerHTML = "";
			for(var u =0; u < temp3.length; u++)
			{
				var created_time = parseInt(temp3[u].created_time);
				var t = new Date(created_time*1000);
				var tWrapper = moment(t);
				var picCaption = "";
				if (temp3[u].caption===null) {
					picCaption = "";
				} else {
					picCaption = temp3[u].caption.text;
				}
				/*
				var postedDate = t.toDateString();
				var postedTime = t.toTimeString();
				*/
				var tagList = "";
				if (temp3[u].tags.length===0) {
					tagList = "none";
				}
				for(var d = 0; d < 5; d++)
				{
					if (d >= temp3[u].tags.length){
						break;
					}
					tagList = tagList + temp3[u].tags[d] + " ";
				}
				document.getElementById("search_results_list_2").innerHTML += '<li class="item"><p><a href="https://instagram.com/'+temp3[u].user.username+'/" target="_blank">'+temp3[u].user.username+'</a><button class="btn btn-primary" data-toggle="modal" data-target=".add_to_group_modal" onClick="addMediaToGroup(\''+u+'\')">Add User to Group</button></p><a href="'+temp3[u].link+'" target="_blank"><img src='+temp3[u].images.low_resolution.url+'></a><div class="media_caption"><p>'+temp3[u].caption.text+'</p><p title="Likes">'+temp3[u].likes.count +" "+'<img src="images/like_icon.png" height="15px" title="Likes" id="like"></p><p>Tags: '+ tagList +'</p><p>Posted '+tWrapper.fromNow()+'</p></div></li>' 
			}
		}

	})
}

var searchPopularMedia = function() {
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/media/popular?access_token=1098874542.200a0fc.34d68bea70e34a5082e6f9b6e92e8f2b",
		success: function(response){
			console.log(response.data);
			temp3 = response.data;
			console.log(temp3.length);
			document.getElementById("search_results_list_2").innerHTML = "";
			for(var u =0; u < temp3.length; u++)
			{
				var created_time = parseInt(temp3[u].created_time);
				var t = new Date(created_time*1000);
				var tWrapper = moment(t);
				var picCaption = "";
				if (temp3[u].caption===null) {
					picCaption = "";
				} else {
					picCaption = temp3[u].caption.text;
				}
				
				var tagList = "";
				if (temp3[u].tags.length===0) {
					tagList = "none";
				}
				for(var d = 0; d < 5; d++)
				{
					if (d >= temp3[u].tags.length){
						break;
					}
					tagList = tagList + temp3[u].tags[d] + " ";
				}
				document.getElementById("search_results_list_2").innerHTML += '<li class="item"><p><a href="https://instagram.com/'+temp3[u].user.username+'/" target="_blank">'+temp3[u].user.username+'</a><button class="btn btn-primary" data-toggle="modal" data-target=".add_to_group_modal" onClick="addMediaToGroup(\''+u+'\')">Add User to Group</button></p><a href="'+temp3[u].link+'" target="_blank"><img src='+temp3[u].images.low_resolution.url+'></a><div class="media_caption"><p>'+picCaption+'</p><p title="Likes">'+temp3[u].likes.count +" "+'<img src="images/like_icon.png" height="15px" title="Likes" id="like"></p><p>Tags: '+ tagList +'</p><p>Posted '+tWrapper.fromNow()+'</p></div></li>' 
				
			}
		}
	})
}

var geocodeLocation = function(loc_query) {
	console.log(loc_query);
	$.ajax({
		type: "GET",
		url: "http://maps.google.com/maps/api/geocode/json?address=" + loc_query + "&sensor=true",
		success: function(response){
			console.log(response);
			var lat = response.results[0].geometry.location.lat;
			var lng = response.results[0].geometry.location.lng;
			searchLocation(lat,lng);
		}
	})
}

var searchLocation = function(a,b) {
	console.log(a,b);
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: "https://api.instagram.com/v1/media/search?lat="+a+"&lng="+b+"&access_token=1098874542.200a0fc.34d68bea70e34a5082e6f9b6e92e8f2b",
		success: function(response){
			console.log(response);
			console.log(response.data);
			temp3 = response.data;
			document.getElementById("search_results_list_2").innerHTML = "";

			for(var u =0; u < temp3.length; u++)
			{
				var created_time = parseInt(temp3[u].created_time);
				var t = new Date(created_time*1000);
				var tWrapper = moment(t);
				var picCaption = "";
				if (temp3[u].caption===null) {
					picCaption = "";
				} else {
					picCaption = temp3[u].caption.text;
				}
				
				var tagList = "";
				if (temp3[u].tags.length===0) {
					tagList = "none";
				}
				for(var d = 0; d < 5; d++)
				{
					if (d >= temp3[u].tags.length){
						break;
					}
					tagList = tagList + temp3[u].tags[d] + " ";
				}
				document.getElementById("search_results_list_2").innerHTML += '<li class="item"><p><a href="https://instagram.com/'+temp3[u].user.username+'/" target="_blank">'+temp3[u].user.username+'</a><button class="btn btn-primary" data-toggle="modal" data-target=".add_to_group_modal" onClick="addMediaToGroup(\''+u+'\')">Add User to Group</button></p><a href="'+temp3[u].link+'" target="_blank"><img src='+temp3[u].images.low_resolution.url+'></a><div class="media_caption"><p>'+picCaption+'</p><p title="Likes">'+temp3[u].likes.count +" "+'<img src="images/like_icon.png" height="15px" title="Likes" id="like"></p><p>Tags: '+ tagList +'</p><p>Posted '+tWrapper.fromNow()+'</p></div></li>' 
			}

		}
	})
}

document.getElementById('username_search_form').addEventListener('submit', function (e) {
    e.preventDefault();
    searchUsernames(document.getElementById('username_query').value);
}, false);

document.getElementById('new_group_form').addEventListener('submit', function (r) {
    r.preventDefault();
    if(document.getElementById('group_name').value===""){
    	alert("Please enter a name for your group");
    } else {
    createGroup(document.getElementById('group_name').value);
	};
}, false);

document.getElementById('search_bar_2').addEventListener('submit', function(m) {
	m.preventDefault();
	searchMediaTags(document.getElementById('tag_query').value);
}, false);

document.getElementById('search_bar_3').addEventListener('submit', function(k) {
	k.preventDefault();
	searchPopularMedia();
}, false);

document.getElementById('search_bar_5').addEventListener('submit', function(t) {
	t.preventDefault();
	geocodeLocation((document.getElementById('loc_query').value));
}, false);

















/*
$.ajax({
    	type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/edmontasaurus/media/recent/?access_token=1098874542.200a0fc.34d68bea70e34a5082e6f9b6e92e8f2b",



        success: function(data) {
        for (var i = 0; i < 4; i++) {
        	$("#instafeed").append("<div class='instaframe'>
			<a target='_blank' href='" + data.data[i].link +"'>
			<img src='" + data.data[i].images.standard_resolution.url +"' /></a></div>"
        	);   
      	}
    }
});
*/