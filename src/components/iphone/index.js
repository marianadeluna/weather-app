// import preact
import { h, render, Component } from "preact";
// import stylesheets for ipad & button
import style from "./style";
import settingStyle from "./settingStyle";
import style_iphone from "../button/style_iphone";
import tipsStyle from "./tipsStyle";
// import jquery for API calls
import $ from "jquery";
// import the Button component

export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });

		//settings display state
		//	this.setDisplay({ display: false });

		//Ash's code
		this.state.date = Date();
		// sets initial states of several variables (primarily to do with button and pages displayed)
		this.setState({
			display: true,
			leftDisabled: true,
			rightDisabled: false,
			mainPage: "display: flex",
			settingsPage: "display: None",
			tipsPage: "display: None",
			mainDisable: "display:flex",
			settingsDisable: "display:flex",
			tipsDisable: "display:flex",
			loadDisable: "display:flex",
			currentWeatherDataIndex: 0,
			hotTips: "display:None",
			coldTips: "display:None",
			index: 0,
			dateIndex: 0,
			degree: "",
			currentDegree: ""
		});
		this.fetchWeatherData();
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		let weatherOrForecast = "";
		let imperialOrMetric = "";
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		//API key from mariana: 078e9afd053a1bb12fec274283b98451
		//API key from Arm: a4816aebb0a1c7072fe81d20ba51b9de
		if (this.state.currentWeatherDataIndex == 0) {
			weatherOrForecast = "weather";
			if (this.state.degree == "f") {
				imperialOrMetric = "imperial";
			} else {
				imperialOrMetric = "metric";
			}
		} else {
			weatherOrForecast = "forecast";
			if (this.state.degree == "f") {
				imperialOrMetric = "imperial";
			} else {
				imperialOrMetric = "metric";
			}
		}
		var url =
			"http://api.openweathermap.org/data/2.5/" +
			weatherOrForecast +
			"?q=London&units=" +
			imperialOrMetric +
			"&APPID=078e9afd053a1bb12fec274283b98451";

		$.ajax({
			url: url,
			dataType: "jsonp",
			success: this.parseResponse,
			error: function(req, err) {
				console.log("API call failed " + err);
			}
		});
	};

	// the main render method for the iphone component
	render() {
		// display
		return (
			//d
			<div>
				<div class={style.container} style={this.state.mainPage}>
					<div class={style.city}>{this.state.locate}</div>
					<button
						class={style.leftbutton}
						onClick={this.campsiteLoad}
						style={this.state.loadDisable}
					/>
					<button
						class={style.rightbutton}
						onClick={this.settingsLoad}
						style={this.state.settingsDisable}
					/>
					<div class={style.temperature}>{this.state.temp}°</div>

					<div class={style_iphone.container}>
						<button
							id="left"
							disabled={this.state.leftDisabled}
							onClick={this.reduceDate}
						>
							{"<"}
						</button>
						<div id="date" class={style.text}>
							{this.formatDate(this.state.date)}
						</div>
						<button
							id="right"
							disabled={this.state.rightDisabled}
							onclick={this.incrementDate}
						>
							{">"}
						</button>
					</div>
					<div class={style.leftContainer}>
						<div class={style.wspeed}>{this.state.wspd}</div>
						<div class={style.humidity}>{this.state.humid}</div>
						<div class={style.temp_min}>{this.state.min}°</div>
					</div>
					<br />
					<div class={style.conditions}>{this.state.cond}</div>
					<div class={style.rightContainer}>
						<div class={style.clouds}>{this.state.precip}</div>
						<div class={style.temp_max}>{this.state.max}°</div>
					</div>

					<button
						class={style.tipsButton}
						onClick={this.tipsLoad}
						style={this.state.tipsDisable}
					/>
				</div>

				<div class={settingStyle.container} style={this.state.settingsPage}>
					<button class={style.leftbutton} onClick={this.mainLoad} />
					<div class={settingStyle.formContainer}>
						<h1>Unit:</h1>
						<select class={style.selectbar} id="Degrees">
							<option value="°C" class={style.selectbar}>
								Metric
							</option>
							<option value="°F">Imperial</option>
						</select>
					</div>
				</div>
				<div class={tipsStyle.container} style={this.state.tipsPage}>
					<button class={style.leftbutton} onClick={this.mainLoad} />
					<h1>Camping Tips:</h1>
					<p style={this.state.hotTips}>
						Stay hydrated and eat lots of calories: Proper nutrition and
						hydration will help you stay warm. Make hot, nutritious breakfasts
						and dinners and enjoy quick snacks and lunches. Be sure to hydrate
						throughout the day.
						<br />
						<br />
						Use gear that’s right for winter camping: You’ll need a sturdy tent,
						a warm sleeping bag, two sleeping pads and a stove suitable for cold
						temperatures.Use gear that’s right for winter camping: You’ll need a
						sturdy tent, a warm sleeping bag, two sleeping pads and a stove
						suitable for cold temperatures.
						<br />
						<br />
						Bring warmer clothing: Midweight base layers, fleece pants, a puffy
						coat, and a waterproof jacket and pants are standard. Don’t forget
						accessories like warm socks, a hat, gloves and sunglasses.
						<br />
						<br />
						Prevent cold injuries: Frostbite and hypothermia are legitimate
						concerns while winter camping. Learn how to avoid them.
					</p>
					<p style={this.state.coldTips}>
						Use a polycotton tent; Polycotton tents or canvas tents, thanks to
						the increase in natural fibres, are more breathable in warm weather,
						letting more air pass through the tent.
						<br />
						<br />
						Let some cool air into your tent. By keeping everything zipped up,
						your tent is going to get incredibly hot and stuffy, so open up the
						windows and doors to let the cooler air circulate. If you have
						awning poles, these will come in very handy for ensuring you can
						keep the front or side doors open.
						<br />
						<br />
						Use warm lighting to keep away insects If you’re using lighting in
						and around your tent, then you’re going to get bugs and insects
						flooding your way unless you use the right kind of lights. Bright
						white lights attract bugs like, well, a moth to a flame, but warmer
						orange lighting is much less appealing. Other tips for beating the
						bugs is to ensure you keep topped up with insect repellent, not
						pitching too close to ponds, rivers or lakes, and ensuring your tent
						has any fly mesh doors closed as much as possible.
					</p>
				</div>
			</div>
		);
	}

	//sets the state of hot and cold tips, the relevent information is displayed depending on the weather
	tipsChoice = () => {
		if (this.state.temp >= 15) {
			this.setState({ hotTips: "display:None", coldTips: "display:flex" });
		} else {
			this.setState({ hotTips: "display:flex", coldTips: "display:None" });
		}
	};

	//loads the settings page by hiding the other pages and displaying the settings page
	settingsLoad = () => {
		this.setState({
			mainPage: "display: None",
			settingsPage: "display: flex",
			mainDisable: "display:flex",
			settingDisable: "display:None"
		});
	};

	//navigate to the page which allows user to see data about camp site.
	campsiteLoad() {
		//    console.log("in campsite");
		var curlocation = location.href;
		location.replace(curlocation + "campsites/");
	}

	/*loads the main page by hiding the other pages, some buttons get disabled and enabled
	also the chosen degree type*/
	mainLoad = () => {
		let curIndex = this.state.index;
		this.setState({
			mainPage: "display: flex",
			settingsPage: "display:None",
			tipsPage: "display:None",
			mainDisable: "display:None",
			settingDisable: "display:flex",
			tipsDisable: "display:flex"
		});
		var a = document.getElementById("Degrees").value;
		var b = a[1];
		if (b == "C") {
			this.setState({ degree: "c" });
		} else {
			this.setState({ degree: "f" });
		}
		this.fetchWeatherData();
		this.state.index = curIndex + 8;
	};

	//Displays the tips page
	tipsLoad = () => {
		this.setState({
			mainPage: "display:None",
			tipsPage: "display:flex",
			mainDisable: "display:flex",
			tipsDisable: "display:None",
			settingDisable: "display:None"
		});
		this.tipsChoice();
	};

	parseResponse = parsed_json => {
		let location;
		let five_temp;
		let conditions;
		let temp_min;
		let temp_max;
		let wspeed;
		let humidity;
		let clouds;
		let hour;

		if (this.state.currentWeatherDataIndex == 0) {
			//if the index is at the current date, get the current weather
			location = parsed_json["name"] + "," + parsed_json["sys"]["country"];
			five_temp = Math.trunc(parsed_json["main"]["temp"]);
			conditions = parsed_json["weather"][0]["description"];
			temp_min = Math.trunc(parsed_json["main"]["temp_min"]);
			temp_max = Math.trunc(parsed_json["main"]["temp_max"]);
			if (this.state.degree == "f") {
				wspeed = Math.trunc(parsed_json["wind"]["speed"]) + "mph";
			} else {
				wspeed = Math.trunc(parsed_json["wind"]["speed"]) + "m/s";
			}
			humidity = parsed_json["main"]["humidity"] + "%";
			clouds = parsed_json["clouds"]["all"] + "%";
			if (this.state.index != 0) {
				//reset index
				this.state.index = 0;
				this.state.dateIndex = 0;
			}
		} else {
			//else get the highest for each weather forecast feature for future days
			location =
				parsed_json["city"]["name"] + "," + parsed_json["city"]["country"];
			hour = parsed_json["list"]["0"]["dt_txt"];
			hour = hour.substring(11, 13);

			if (this.state.index == 0) {
				//calculate the initial index for forecast
				//which is defined by increments of 3
				this.state.index = (hour / 3 - 4) * -1;
				if (this.state.index < 0) {
					this.state.index = this.state.index + 8;
				}
			} else {
				//else increment based on whether the date was incremented or reduced
				if (this.state.dateIndex < this.state.currentWeatherDataIndex) {
					//if date was incremented, increment the array index
					this.state.index = this.state.index + 8;
				} else {
					//if date was reduced, decrease the array index
					this.state.index = this.state.index - 8;
				}
				this.state.dateIndex = this.state.currentWeatherDataIndex;
			}

			five_temp = Math.trunc(
				parsed_json["list"][this.state.index]["main"]["temp"]
			);
			conditions =
				parsed_json["list"][this.state.index]["weather"]["0"]["description"];
			temp_min = Math.trunc(
				parsed_json["list"][this.state.index]["main"]["temp_min"]
			);
			temp_max = Math.trunc(
				parsed_json["list"][this.state.index]["main"]["temp_max"]
			);
			if (this.state.degree == "f") {
				wspeed =
					Math.trunc(
						parsed_json["list"][this.state.index]["wind"]["speed"]
					) + "mph";
			} else {
				wspeed =
					Math.trunc(
						parsed_json["list"][this.state.index]["wind"]["speed"]
					) + "m/s";
			}

			humidity =
				parsed_json["list"][this.state.index]["main"]["humidity"] + "%";
			clouds = parsed_json["list"][this.state.index]["clouds"]["all"] + "%";
		}

		//	set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: five_temp,
			cond: conditions,
			min: temp_min,
			max: temp_max,
			wspd: wspeed,
			humid: humidity,
			precip: clouds,
			hr: hour
		});
	};

	//formats date into readable data
	formatDate(d) {
		var monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		var date = new Date(d);
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		var today = day + " " + monthNames[monthIndex] + " " + year;
		return today;
	}

	//reduces the date by 1 and updates the weather, cannot go lower than today
	reduceDate = () => {
		var currentDate = new Date(this.state.date);
		this.setState({ rightDisabled: false });
		currentDate.setDate(currentDate.getDate() - 1);
		this.state.date = currentDate;
		this.setState({
			date: currentDate,
			currentWeatherDataIndex: this.state.currentWeatherDataIndex - 1
		});
		var temp1 = this.formatDate(currentDate);
		var temp2 = this.formatDate(Date());
		if (temp1 == temp2) {
			this.setState({ leftDisabled: true });
		}
		this.fetchWeatherData();
	};

	//increases date by 1 and updates the weather, only up to 5 days
	incrementDate = () => {
		var currentDate = new Date(this.state.date);
		var today = new Date();
		var week = new Date();
		week.setDate(today.getDate() + 4);
		this.setState({ leftDisabled: false });
		currentDate.setDate(currentDate.getDate() + 1);
		this.state.date = currentDate;
		this.setState({
			date: currentDate,
			currentWeatherDataIndex: this.state.currentWeatherDataIndex + 1
		});
		if (this.formatDate(currentDate) == this.formatDate(week)) {
			this.setState({ rightDisabled: true });
		}
		this.fetchWeatherData();
	};
}
