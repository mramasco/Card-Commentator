function CardCtrl($scope) {

	var searchBoxTimeout = null;

	$scope.card1 = "http://mtgimage.com/card/Craw Wurm.jpg";
	$scope.card2 = "http://mtgimage.com/card/Serra_Angel.jpg";
	$scope.card3 = "http://mtgimage.com/card/Mountain.jpg";
	$scope.testCardList = [];

	$scope.cardList = [
		{
			src: "http://mtgimage.com/card/Craw Wurm.jpg",
			name: "Test1"
		},
		{
			src: "http://mtgimage.com/card/Serra_Angel.jpg",
			name: "Test2"
		}
	];

	$scope.addCard = function () {
		$scope.cardList.push({
			src: "http://mtgimage.com/card/Craw Wurm.jpg",
			name: "Test1"
		});
	}

	$scope.change = function () {

		if (searchBoxTimeout != null) {
			clearTimeout(searchBoxTimeout)
		}
		searchBoxTimeout = setTimeout(timeoutFunction, 500);
	};

	function timeoutFunction() {
		var searchText = $scope.cardSearch;
		if (searchText.length > 1) {
			var cardsFromApi = JSON.parse(httpGet("http://api.mtgdb.info/search/" + $scope.cardSearch));;

			if (cardsFromApi.length > 10) {
				$scope.testCardList = cardsFromApi.slice(0, 9);
			} else {
				$scope.testCardList = cardsFromApi;
			}
		}
	}

	function httpGet(theUrl) {
		var xmlHttp = null;

		xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", theUrl, false);
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}



}

/********************************************************************************************************
* Temporary fix for filling columns to max height
********************************************************************************************************/
//hacky attempt to get middle columns to fill the rest of the screen. http://blog.corunet.com/three-column-layout-with-full-page-height/
function fillthescreen() {
	winH = windowHeight(); //This returns the screen heigth
	heightNeeded = winH - 70; //We need to substract the footer height
/*	if (typeof (window.innerWidth) != 'number') { //Explorer doesn't recognize minHeight
		document.getElementById('leftPlayerHand').style.height = heightNeeded + 'px'; //So, we use height (and explroer bug)
	}*/
	document.getElementById('leftPlayerHand').style.height = heightNeeded + 'px'; //So, we use height (and explroer bug);
	document.getElementById('leftPlayerPlayField').style.height = heightNeeded + 'px'; //So, we use height (and explroer bug);
	document.getElementById('streamSection').style.height = heightNeeded + 'px'; //So, we use height (and explroer bug);
	document.getElementById('rightPlayerPlayField').style.height = heightNeeded + 'px'; //So, we use height (and explroer bug);
	document.getElementById('rightPlayerHand').style.height = heightNeeded + 'px'; //So, we use height (and explroer bug);
}

function windowHeight() {
	var alto = 0;
	if (typeof (window.innerWidth) == 'number') {
		alto = window.innerHeight;
	} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		alto = document.documentElement.clientHeight;
	} else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
		alto = document.body.clientHeight;
	}
	return alto;
}