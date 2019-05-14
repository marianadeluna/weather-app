// import preact
import { h, render, Component } from "preact";
// import stylesheets for ipad & button
import style from "./style";
// import jquery for API calls
import $ from "jquery";
export default class Campsite extends Component {
	// a constructor with initial set states
	constructor(props) {
		super(props);
	}

	//function which will generate a container and fill it with the data of all the campsites.
	setup() {
		var app = document.getElementById("app");
		if (app != null) {
			var container = document.createElement("div");
			container.className = style.container;

			//
			var header = document.createElement("div");
			header.className = style.header;
			header.appendChild(
				document.createTextNode("Campsite Recomendation Menu")
			);
			// document.body.appendChild(header);

			var backbutton = document.createElement("button");
			backbutton.className = style.leftbutton;
			backbutton.onclick = function() {
				var curlocation = location.href;
				location.replace(curlocation + "../");
			};

			var gridcont = document.createElement("div");
			gridcont.className = style.gridcontainer;

			var datafile = new XMLHttpRequest();
			datafile.open("GET", "../../assets/Campsite/Campsites.data", false);
			datafile.onreadystatechange = function() {
				if (
					datafile.readyState === 4 &&
					(datafile.status === 200 || datafile.status === 0)
				) {
					var allText = datafile.responseText;
					var lines = allText.split("\n");

					//read through the  camp site data and generate div tags based on the data in the file
					for (var line = 0; line < lines.length - 1; line++) {
						var words = lines[line].split("|");

						let item = document.createElement("dir");
						item.className = style.griditem;

						let image = document.createElement("img");
						image.className = style.griditemimg;
						image.setAttribute(
							"src",
							"../../assets/Campsite/" + words[5] + ".jpg"
						);

						let itemhead = document.createElement("div");
						itemhead.className = style.griditemhead;
						itemhead.appendChild(document.createTextNode(words[1]));

						let itemdesc = document.createElement("div");
						itemdesc.className = style.gridoverlay;
						let itemtext = document.createElement("div");

						itemtext.appendChild(document.createTextNode(""));

						this.fetchWeatherData(
							words[4],
							words[3],
							itemtext,
							item,
							words[2],
							words[6],
							words[7],
							words[8]
						);

						itemtext.setAttribute("id", words[0]);

						itemdesc.appendChild(itemtext);
						itemdesc.setAttribute("id", words[0]);

						item.appendChild(itemhead);
						item.appendChild(image);
						item.appendChild(itemdesc);

						item.onclick = function() {
							//set up a function so that when a camp is clicked the data is shown for 10 seconds.
							setTimeout(
								"document.getElementById(" +
									event.target.getAttribute("id") +
									").style.opacity = '0'",
								10000
							);
							document.getElementById(
								event.target.getAttribute("id")
							).style.opacity = "1";
						};
						gridcont.appendChild(item);
					}
				}
			}.bind(this);
			datafile.send(null);
			container.appendChild(header);
			container.appendChild(backbutton);
			container.appendChild(gridcont);
			document.getElementById("app").appendChild(container);
		}
	}

	fetchWeatherData() {
		// perform a call to the api . the api data is called using the longitude and latitude of the campsite
		var longitude = arguments[0];
		var latitude = arguments[1];
		var itemtext = arguments[2];
		var item = arguments[3];
		var type = arguments[4];
		var address = arguments[5];
		var postcode = arguments[6];
		var city = arguments[7];

		var url =
			"http://api.openweathermap.org/data/2.5/weather?lon=" +
			longitude +
			"&lat=" +
			latitude +
			"&units=metric&APPID=a4816aebb0a1c7072fe81d20ba51b9de";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: function(parsed_json) {
				item.setAttribute("value", parsed_json["main"]["temp"]);
				itemtext.appendChild(document.createTextNode(""));

				itemtext.className = style.gridoverlaytext;
				itemtext.innerHTML =
					"Temperature: " +
					parsed_json["main"]["temp"] +
					"<br>Conditions: " +
					parsed_json["weather"]["0"]["description"] +
					"<br>Type:" +
					type +
					"<br>Address:" +
					address +
					"<br>Postcode:" +
					postcode +
					"<br>City:" +
					city;
			},
			error: function(req, err) {
				console.log("API call failed " + err);
			}
		});
	}

	render() {
		this.setup();
	}
}
