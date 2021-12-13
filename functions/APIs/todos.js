// exports.getAllTodos = (request, response) => {
//     todos = [
//         {
//             'id': '1',
//             'title': 'greeting',
//             'body': 'Hello world from sharvin shah' 
//         },
//         {
//             'id': '2',
//             'title': 'greeting2',
//             'body': 'Hello2 world2 from sharvin shah' 
//         }
//     ]
//     return response.json(todos);
// }

const { db } = require('../util/admin');
const { scrapePageSummaryDetails } = require('./singlePropertyScraper');

exports.getAllTodos = (request, response) => {
	db
		.collection('todos')
		// .orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let todos = [];
			console.log("getAllTodos");
			data.forEach((doc) => {
				todos.push({
					todoId: doc.id,
					title: doc.data().title,
					body: doc.data().body,
					createdAt: doc.data().createdAt,
				});
			});
			return response.json(todos);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code });
		});
};

exports.getOneMyHome = (request, response) => {
	console.log("=======");
	console.log(request.body.url);
	response.json({ 'ans': 'test1' })
	// let summaryDetails =  scrapePageSummaryDetails(request.body.url).then((value) => {
	// 	return response.json(value)
	// });
};

exports.postOneMyHome = (request, response) => {
	console.log("=======");
	console.log({ 'ans': 'postOneMyHome running' });
	// response.json({'ans':'test3' + request.body})
	let summaryDetails = scrapePageSummaryDetails(request.body.url).then((value) => {
		return response.json(value)
	});
};

exports.getAllProps = (request, response) => {
	db
		.collection('properties')
		// .orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let props = [];
			console.log("getAllProps");
			data.forEach((doc) => {
				console.log(doc.data());

				props.push(doc.data());
			});
			return response.json(props);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code });
		});
};


exports.postOneProperty = (request, response) => {
	var properties = { '4545782': { '_id': '4545782', 'targetURL': '/residential/brochure/1-brookvale-brookvale-road-eglington-road-donnybrook-cork-4/4545778', 'address': '1 Brookvale, Brookvale Road, Eglington Road, Donnybrook, cork 4', 'county': 'cork 4', 'beds': '3', 'm2area': '70.1', 'propType': 'n.a', 'baths': '1', 'initPrice': '595000', 'curPrice': '', 'pprPrice': '', 'initDate': '21/12/02', 'updatedDate': '' } }

	var arrProperties = Object.keys(properties).map((key) => [Number(key), properties[key]]);
	// console.log(arrProperties);
	let i = 1;
	let newTodoItem;
	for (const propertyCard of arrProperties) {
		console.log(propertyCard[0]);
		i += 1;
		newTodoItem = propertyCard[1]
		console.log(newTodoItem);
		db
			.collection('properties')
			.add(newTodoItem)
			.then((doc) => {
				const responseTodoItem = newTodoItem;
				responseTodoItem.id = doc.id;
				console.log('posted success');
				return response.json(responseTodoItem);
			})
			.catch((err) => {
				response.status(500).json({ error: 'Something went wrong' });
				console.error('posted fail');
				return response.json({ 'ans': 'err' });
			});
	}
	// const newTodoItem = {
	//     title: request.body.title,
	//     body: request.body.body,
	//     createdAt: new Date().toISOString(),

	// 	'_id' : str(propertyID),
	// 	'targetURL': str(targetURL),
	// 	'address': str(address),
	// 	'county': str(county),
	// 	'beds': str(beds),
	// 	'm2area': str(m2area),
	// 	'propType': str(propType),
	// 	'baths': str(baths),
	// 	'ber': str('xxxxxxxxx'),
	// 	'initPrice': str(price),
	// 	'curPrice': str(price),
	// 	'pprPrice': '',
	// 	'initDate': str(date.today().strftime("%y/%m/%d")),
	// 	'updatedDate': '',
	// 	'age' : 'ageState'
	// }
	// db
	//     .collection('todos')
	//     .add(newTodoItem)
	//     .then((doc)=>{
	//         const responseTodoItem = newTodoItem;
	//         responseTodoItem.id = doc.id;
	//         return response.json(responseTodoItem);
	//     })
	//     .catch((err) => {
	// 		response.status(500).json({ error: 'Something went wrong' });
	// 		console.error(err);
	// 	});
	// return response.json({ 'ans': 'temp' });
}
