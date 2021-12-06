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
			return response.status(500).json({ error: err.code});
		});
};

exports.getOneMyHome = (request, response) => {
	// if (request.body.body.trim() === '') {
	// 	return response.status(400).json({ body: 'Must not be empty' });
    // }
    
    // if(request.body.title.trim() === '') {
    //     return response.status(400).json({ title: 'Must not be empty' });
    // }
    console.log("=======");
	console.log(request.body.hi);
	return response.json(request.body.hi);
            // return response.json(responseTodoItem);

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
				console.log(doc.data()._id);

				props.push({
                    propId: doc.data()._id,
                    targetURL: doc.data().targetURL,
					price: doc.data().price
				});
			});
			return response.json(props);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.postOneProperty = (request, response) => {
	var properties = {'4545780': {'_id': '4545780', 'targetURL': '/residential/brochure/1-brookvale-brookvale-road-eglington-road-donnybrook-dublin-4/4545778', 'address': '1 Brookvale, Brookvale Road, Eglington Road, Donnybrook, Dublin 4', 'county': 'Dublin 4', 'beds': '2', 'm2area': '70.1', 'propType': 'n.a', 'baths': '2', 'initPrice': '595000', 'curPrice': '', 'pprPrice': '', 'initDate': '21/12/02', 'updatedDate': ''}}

	var arrProperties = Object.keys(properties).map((key) => [Number(key), properties[key]]);
	// console.log(arrProperties);
	let i = 1;
	let newTodoItem;
	for(const propertyCard of arrProperties) {
		console.log(propertyCard[0]);
		i += 1;
		newTodoItem = propertyCard[1]
		db
        .collection('properties')
        .add(newTodoItem)
        .then((doc)=>{
            const responseTodoItem = newTodoItem;
            responseTodoItem.id = doc.id;
			console.error('posted success');
            return response.json(responseTodoItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error('posted fail');
			return response.json({'ans':'err'});
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
	return response.json({'ans':'temp'});
}
