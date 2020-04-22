
request = require('request-promise-native');

class Service{

	listerClients(start, size){

		return new Promise( (resolve, reject) => {
			request('http://localhost:8080/clients?start='+start+'&size='+size, { json:true}, (err,res,body) => {
				if (err) { 
					reject(err); 
				} else {
					resolve(body);
				}
			});
		})
	}

	ajouterClient(saisieNom, saisiePrenom) {

		return new Promise( (resolve, reject) => {
			request('http://localhost:8080/clients', { json: true, method: 'POST',
			body: {
				nom : saisieNom,
				prenoms : saisiePrenom
			}}, (err,res,body) => {
				if (err) {
					reject(err); 
				} else {
					resolve(body);
				}
			});
		})
		
	}
}

module.exports = Service;