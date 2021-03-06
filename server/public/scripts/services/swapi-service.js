// CHANGE SERVICE NAME AS NEEDED FOR YOUR PROJECT
myApp.service('SwapiService', ['$http', function($http) {
	console.log('SwapiService Locked and loaded!');

	const self = this;
	
	self.message = "Welcome to the SwapiService!";

	// THIS HANDLES CREATING AN ARRAY INSIDE AN OBJECT
	self.searchResults = {list:[]};
	self.favorites = {list:[]};
	self.resources = {list:[]}

	// THIS HANDLES SEARCHING SWAPI
	self.searchSwapi = (resource, keyword) => {
		$http.get('https://swapi.co/api/' + resource + '/?search='+ keyword)
		.then((response) => {
			self.searchResults.list = response.data.results;
			console.log('self.searchResults.list', self.searchResults.list);
		})
	}

	// THIS HANDLES GETTING THE RESOURCE
	self.getResources = () => {
		$http.get('https://swapi.co/api/')
		.then((response) => {
			self.resources.list = response.data;
		})
	}

	// THIS HANDLES GETTING FAVORITES
	self.getFavorites = () => {
		$http.get('/favorites')
		.then((response) => {
			self.favorites.list = response.data;
			console.log('self.favorites.list', self.favorites.list);
		})
		.catch((response) => {
			console.log('Error GETting getFavorites!');
		})
	}

	// THIS HANDLES POSTING FAVORITED SEARCH RESULTS
	self.addToFavorites = (favorite) => {
		$http.post('/favorites', favorite)
		.then((response) => {
		})
		.catch((response) => {
			console.log('Error POSTing addToFavorites!');
		})
	}

	// THIS HANDLES DELETING A FAVORITE
	self.deleteFavorite = (favoriteId) => {
		$http.delete(`/favorites/${favoriteId}`)
		.then((response) => {
			self.getFavorites();
		})
		.catch((response) => {
			console.log('Error DELETing:', response);
		})
	}
	self.getFavorites();
}]);