(function () {
	// Fab & Dialog Elements
	var addCardElement = document.querySelector('.main__fab');
	var dialogElement = document.querySelector('.dialog');
	var dialogOverlayElement = document.querySelector('.dialog__overlay');
	var dialogInput = document.querySelector('.dialog__input');
	var dialogCloseBtn = document.querySelector('.dialog__close');
	var dialogInputBtn = document.querySelector('.dialog__add');
	var headerElement = document.querySelector('.header');
	//var menuHeaderElement = document.querySelector('.menu__header');
	//var fabElement = document.querySelector('.main__fab');
  var metaTagTheme = document.querySelector('meta[name=theme-color]');
  var loader = document.querySelector('.main__loader');
  var userNames = JSON.parse(localStorage.getItem('usernames'));

   //Show spinner
  function showSpinner() {
  	loader.classList.remove('hide');
  }

  //Hide spinner
  function hideSpinner() {
  	loader.classList.add('hide');
  }

	
	
	function fetchIplUserInfo(username) {	
		showSpinner();

		//Fetch API
		fetch('https://jsonplaceholder.typicode.com/users').then(function (response) {
			return response.json();
		})
		.then(function (data) {
			hideSpinner();

			if (data && data.message) {
				return false;
			}
			
			data.map(function (user) {
				var newCard = document.querySelector('.github__card').cloneNode(true);
	
				newCard.querySelector('.github__header span').textContent = user.name;
				newCard.classList.remove('hide');
				document.querySelector('.main').appendChild(newCard);	
			});

		})
		.catch(function (error) {
			hideSpinner();
			console.error('Error in fetching data ', error);
		});
	}



	//Once the DOM is loaded, check for connectivity
	document.addEventListener('DOMContentLoaded', function(event) { 
		if (!navigator.onLine) {
			goOffline();
		}

		//Offline event listener
		window.addEventListener("offline", function () {
			goOffline();
		});
		
		//Online event listener
		window.addEventListener("online", function () {
			goOnline()
		});
	});

	function goOffline() {
		showSnackBar("App is offline");
		var offlineColor = '#9E9E9E';
		metaTagTheme.setAttribute('content', offlineColor);
		headerElement.style.background = offlineColor;
	}

	function goOnline() {
		metaTagTheme.setAttribute('content', '#1E88E5');
		headerElement.style.background = '';
	}

	//To hide dialog
	function hideDialog() {
		dialogElement.classList.add('dialog--hide');
	}

	fetchIplUserInfo();
	
	
	/*if (userNames) {
		userNames.map(function (userName) {
			fetchGithubInfo(userName); 
		});
	}*/
})();