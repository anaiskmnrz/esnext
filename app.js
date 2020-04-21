// LET
console.log("\n*** LET ***\n");

let favoriteCityId = "rome";
console.log(favoriteCityId);
favoriteCityId = "paris";
console.log(favoriteCityId);

// CONST
console.log("\n*** CONST ***\n");

const citiesId = ['paris', 'nyc', 'rome', 'rio-de-janeiro'];
console.log(citiesId);

// c'est une constante on peut pas faire une nouvelle affectation
// citiesId = [];

//mais on peut ajouter de nouvelles valeurs dans une constante
citiesId[4] = 'tokyo';
console.log(citiesId);

// CREATION D'OBJET
console.log("\n*** CREATION D'OBJET ***\n");

function getWeather(cityId){
	let city = cityId.toUpperCase();
	let temperature = 20;
	return {city, temperature}
}

const weather = getWeather(favoriteCityId);
console.log(weather);

// AFFECTATION DESTRUCTUREE
console.log("\n*** AFFECTATION DESTRUCTUREE ***\n");

let {city, temperature} = weather;
console.log(city);
console.log(temperature);

// REST OPERATOR

console.log("\n*** REST OPERATOR ***\n");

let [parisId, nycId, ...othersCitiesId] = citiesId;

console.log(parisId);
console.log(nycId);
console.log(othersCitiesId.length);

// CLASSE
console.log("\n*** CLASSE ***\n");

class Trip {
	constructor(id, name, imageUrl){
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
	}

	toString(){
		return "Trip [" + this.id + ", " +this.name + ", " +this.imageUrl
			+ ", " + this._price+ "]";
	}

	get price(){
		return this._price;
	}

	set price(newPrice) {

		this._price = newPrice;
	}

	getDefaultTrip() {
		return new Trip('rio-de-janeiro','Rio de Janeiro', 'img/rio-de-janeiro.jpg');
	}
}

const parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg');

console.log(parisTrip);
console.log(parisTrip.name);

console.log(parisTrip.toString());

parisTrip.price = 100;

console.log(parisTrip.toString());

const defaultTrip = new Trip().getDefaultTrip();
console.log(defaultTrip.toString());

console.log(parisTrip._price);

// HERITAGE 

console.log("\n*** HERITAGE ***\n");

class FreeTrip extends Trip{
	constructor(id, name, imageUrl){
		super(id, name, imageUrl);
		this._price=0;
	}

	toString() {
		return "Free" + super.toString();
	}
}

freeTrip = new FreeTrip('nantes','Nantes','img/nantes.jpg');
console.log(freeTrip.toString());

// PROMISE, SET, MAP, ARROW FUNCTION

console.log("\n*** PROMISE, SET, MAP, ARROW FUNCTION ***\n");

class TripService {

	constructor() {
		this.setTrip = new Set();
		this.setTrip.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
		this.setTrip.add(new Trip('nantes','Nantes', 'img/nantes.jpg'));
		this.setTrip.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));

	}

	findByName(tripName) {
		return new Promise((resolve, reject) => {
			setTimeout( () => {
				 for (const trip of this.setTrip) {
				 	if (trip.name == tripName){
				 		resolve(trip);
				 	}
				 }
				 reject("No trip with name " + tripName);

			}, 2000)
		});
	}
}


class PriceService {

	constructor() {
		this.mapTrip = new Map();
		this.mapTrip.set('paris',100);
		this.mapTrip.set('rio-de-janeiro',800);
	}

	findPriceByTripId(tripId) {

		return new Promise((resolve, reject) => {

			setTimeout( () => {
				if (this.mapTrip.has(tripId)){
					resolve(this.mapTrip.get(tripId));
				} else {
					reject('No price for id ' + tripId);
				}
			},2000)
		});
	}
}

instanceTripService = new TripService ();
instancePriceService = new PriceService();

instanceTripService.findByName("Rio de Janeiro").then(trip => console.log("Trip found : " + trip));
instanceTripService.findByName("Toulouse").then(trip => console.log("Trip found : " + trip)).catch(err => console.log(err));

instanceTripService.findByName("Rio de Janeiro")
	.then( trip => trip.id)
	.then( idTrip => instancePriceService.findPriceByTripId(idTrip))
	.then(prix => console.log("Price found : "+ prix))
	.catch(err => console.log(err));

instanceTripService.findByName("Nantes")
	.then( trip => trip.id)
	.then( idTrip => instancePriceService.findPriceByTripId(idTrip))
	.then(prix => console.log("Price found : "+ prix))
	.catch(err => console.log(err));
