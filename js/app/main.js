var markerLayer,map;
$(document).ready(function(){

	markerLayer =  L.markerClusterGroup();// L.featureGroup();
	 map = L.map('map').setView([39.134172, -98.628082], 4);
	 	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

		
			//activate on open
			$("#wrapper").toggleClass("toggled");
			$("#wrapper2").toggleClass("toggled");
			
			//easybutton search
			L.easyButton('fa-search', function () {
				$("#wrapper").toggleClass("toggled");
				$("#wrapper2").toggleClass("toggled");
				}).addTo(map);
			
			// easybutton home
			L.easyButton('fa-home', function () {
				map.setView([39.134172, -98.628082], 4.488);
				var divs = document.getElementsByClassName('search1');
				var divs2 = document.getElementsByClassName('search2');
				// //alert(divs[0].innerHTML.indexOf(x));
				for (var i = 0; i < divs.length; i++) {
					$("#" + divs[i].id).css({
						'display': 'block'
					});
				}
				for (var i = 0; i < divs2.length; i++) {
					$("#" + divs2[i].id).css({
						'display': 'block'
					});
				}
				//   	return false;


			}).addTo(map);
			// setup a marker group
            markerLayer.addTo(map);
			
			map.attributionControl.setPrefix('Licensed MIT');		
		
	loadData(-1); // by default -1 so that it will load all data
		
});

function loadData(ye){
	markerLayer.clearLayers();
	var uu = "php/getData.php";
	var dd = 0;
	if (ye != -1){
		uu = "php/getData.php?year="+ye;
		dd = ye;
	}


	$.ajax({
		type: "GET",
		url: uu,
		yy : dd,
		success: function(msg) {
				
			$('.search1').remove();
			$('.search2').remove();
			var allData = JSON.parse(msg);
			var SchData = allData;
			//ordered list of all colleges
			sortByKey(SchData, 'col_nm');
			var previousdiv = document.getElementById('College-list');
			//produces all of markers
			var markerL = [];
			for (var i = 0; i <= SchData.length - 1; i++) {
				var nextcollege = SchData[i];
				var marker = new L.marker([nextcollege.lat,nextcollege.lng], {/*riseOnHover: true*/});
				/*
				marker.on('mouseover', function (e) {
					this.openPopup();
				});
				marker.on('mouseout', function (e) {
					this.closePopup();
				});
				*/
				
				
				markerL.push(marker);
				
				//add text
				var markertext = L.popup({
					closeButton: false,
					offset: L.point(0, 0),

				})
						.setContent("");

				var str = "";
				// if (undefined == nextcollege.students){
					//College do not have students for the respectiveyear
					// continue;
				// }
				// nextcollege.students.sort();
				

				markertext.setContent("<p style = 'margin:0px; font-family: Lora, serif; font-size:110%; font-weight:bold;'>" 
							+ "<img src='dataimgs/college/"+nextcollege.col_lg+"' class='imm-college'  alt='"+nextcollege.col_nm+"' /> <a href='" 
							+  nextcollege.web_url + "' target='_blank'>"+  nextcollege.col_nm + "</a> </br>Enrolled (" + nextcollege.enrolled + ")</br>Accepted (" + nextcollege.accepted + ")</p><hr style = 'margin:3px'>" /*+ str */);
				var collegeIcon = L.icon({
					iconUrl: "dataimgs/college/"+nextcollege.col_lg,
					iconSize:     [50, 50], // size of the icon
					className : "LIcon"
				});
				
				marker.setIcon(collegeIcon);
				marker.addTo(markerLayer );
				marker.bindPopup(markertext);
				//creates HTML div for each element in list
				var htmlrest = document.createElement('newdiv');
				htmlrest.setAttribute("divid", 0);
				previousdiv.appendChild(htmlrest);
				htmlrest.innerHTML = nextcollege.col_nm;
				htmlrest.setAttribute("markerindex", i);
				htmlrest.setAttribute("class", "search2");
				htmlrest.setAttribute("id", i);
				//creates mouselistener from list to marker
				htmlrest.addEventListener("click", function (e) {

					var index = e.target.getAttribute("markerindex");
					map.setView(markerL[index].getLatLng(), 12);
					markerL[index].fire('click');
					//$("#wrapper").toggleClass("toggled");
				});

				
			}
			
			
			//ordered list of all students
			var allstudents = [];
			allstudents = [2012,2013,2014,2015,2016,2017,2018];
			var previousdiv2 = document.getElementById('Student-list');
			
			allstudents.sort();

			
			
			for (var i = 0; i <= allstudents.length - 1; i++) {
				var htmlrest = document.createElement('div');
				htmlrest.setAttribute("divid", "div_"+allstudents[i]);
				previousdiv2.appendChild(htmlrest);
				htmlrest.innerHTML = allstudents[i];//allstudents[i][0].st_nm;

				htmlrest.setAttribute("yearVal", allstudents[i]);
				htmlrest.setAttribute("class", "search1");
				htmlrest.setAttribute("id", "div_"+allstudents[i]);
				//create stuff
				htmlrest.addEventListener("click", function (e) {
					var yearVal = e.target.getAttribute("yearVal");
					loadData(yearVal);
				});
			}
			$(".search1").css("background-color", "#f7f7f7");//resetting color
			if (this.yy>0){
				//do nothing
				$("#div_"+this.yy).css("background-color", "beige");
			}else{
				//first time only
				$("#div_2012").click();
				$("#div_2012").css("background-color", "beige");
			}
		},
		error: function(data) {
			console.log("Error");
		},
		complete: function(data) {
		   
			//A function to be called when the request finishes 
			// (after success and error callbacks are executed). 
		}
	});

}

	
			
function sortByKey(array, key) {
	return array.sort(function (a, b) {
		var x = a[key].toLowerCase();
		var y = b[key].toLowerCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}
			
//function run by form to search
function find() {


	var x = document.getElementById('search').value.toLowerCase();
	//var y = document.getElementbyId('smh').innerHTML.indexOf(x) != -1
	var divs = document.getElementsByClassName('search1');
	//alert(divs[0].innerHTML.indexOf(x));
	if (x == "") {
		for (var i = 0; i < divs.length; i++) {
			$("#" + divs[i].id).css({
				'display': 'block'
			});
		}
		return false;
	}
	if (x.length == 1) {
		for (var i = 0; i < divs.length; i++) {
			if (divs[i].innerHTML.charAt(0).toLowerCase().indexOf(x) == -1) {
				//$("#"+divs[i].id).toggleClass("toggled");

				$("#" + divs[i].id).css({
					'display': 'none'
				});
			} else {
				$("#" + divs[i].id).css({
					'display': 'block'
				});
			}
		}
		return false;
	}

	if (x.length < 4) {
		for (var i = 0; i < divs.length; i++) {
			firstlast = divs[i].innerHTML.toString().split(" ");

			if (firstlast[0].substring(0, x.length).toLowerCase().indexOf(x) == -1 && firstlast[1].substring(0, x.length).toLowerCase().indexOf(x) == -1) {
				//$("#"+divs[i].id).toggleClass("toggled");

				$("#" + divs[i].id).css({
					'display': 'none'
				});
			} else {
				$("#" + divs[i].id).css({
					'display': 'block'
				});
			}
		}
		return false;
	}

	for (var i = 0; i < divs.length; i++) {
		//str = divs[i].innerHTML.toLowerCase();

		if (divs[i].innerHTML.toLowerCase().indexOf(x) == -1) {
			//$("#"+divs[i].id).toggleClass("toggled");

			$("#" + divs[i].id).css({
				'display': 'none'
			});
		} else {
			$("#" + divs[i].id).css({
				'display': 'block'
			});
		}
	}

	return false;
}

function find2() {


	var x = document.getElementById('searchB').value.toLowerCase();
	//var y = document.getElementbyId('smh').innerHTML.indexOf(x) != -1
	var divs = document.getElementsByClassName('search2');
	//alert(divs[0].innerHTML.indexOf(x));
	if (x == "") {
		for (var i = 0; i < divs.length; i++) {
			$("#" + divs[i].id).css({
				'display': 'block'
			});
		}
		return false;
	}
	if (x.length == 1) {
		for (var i = 0; i < divs.length; i++) {
			if (divs[i].innerHTML.charAt(0).toLowerCase().indexOf(x) == -1) {
				//$("#"+divs[i].id).toggleClass("toggled");

				$("#" + divs[i].id).css({
					'display': 'none'
				});
			} else {
				$("#" + divs[i].id).css({
					'display': 'block'
				});
			}
		}
		return false;
	}

	for (var i = 0; i < divs.length; i++) {
		//str = divs[i].innerHTML.toLowerCase();

		if (divs[i].innerHTML.toLowerCase().indexOf(x) == -1) {
			//$("#"+divs[i].id).toggleClass("toggled");

			$("#" + divs[i].id).css({
				'display': 'none'
			});
		} else {
			$("#" + divs[i].id).css({
				'display': 'block'
			});
		}
	}

	return false;
}
