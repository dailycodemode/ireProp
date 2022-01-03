const { db } = require('../util/admin');
const { scrapePageSummaryDetails } = require('./singlePropertyScraper');
const { basicPropAnalysis } = require('./analysis/basicPropertiesAnalysis');
const fs = require('fs')

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
};

exports.postOneMyHome = (request, response) => {
	console.log("=======");
	console.log({ 'func': 'postOneMyHome running' });

	let summaryDetailsCall = scrapePageSummaryDetails(request.body.url).then((value) => {
		console.log("2nd part of chain");
		const dbName = getDbName(value.houseType)

		const answer = db
			.collection(dbName)
			.get()
			.then((data) => {
				let allPropsForType = [];

				data.forEach((doc) => {
					allPropsForType.push({
						propId: doc.data()._id,
						targetURL: doc.data().targetURL,
						curPrice: doc.data().curPrice,
						createdAt: doc.data().createdAt,
						propType: doc.data().propType,
					});
				});
				console.log("amount of properties returned..." + allPropsForType.length);
				let objAnalysis = basicPropAnalysis(allPropsForType, value.houseType);
				return response.json(objAnalysis)
			})
			.catch((err) => {
				console.error(err);
				return response.status(500).json({ error: err.code });
			});
		console.log("end of chain");
	})


	// return response.json("postOneMyHome testing to work around promies")
};

const getDbName = (houseType) => {
	let dictDb = {
		"S": "dublin_semiD_eot",
		"B": "dublin_tertiary",
		"H": "dublin_house",
		"E": "dublin_semiD_eot",
		"A": "dublin_apartment",
		"T": "dublin_duplex_terrace",
		"R": "dublin_tertiary",
		"D": "dublin_duplex_terrace",
		"Z": "dublin_tertiary",
		"C": "dublin_tertiary",
		"I": "dublin_tertiary",
		"K": "dublin_tertiary",
		"F": "dublin_apartment",
		"L": "dublin_tertiary",
		"M": "dublin_tertiary",
		"O": "dublin_tertiary",
		"P": "dublin_tertiary",
	}

	if (houseType in dictDb) {
		console.log("dbName: " + dictDb[houseType]);
		return dictDb[houseType]
	}
	console.log("dbName: NOTFOUND");
	return ""
}

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
	const arr = [
		{ "dbCollection": "dublin_apartment", "jsonFile": "dublin_apartment.json" },
		{ "dbCollection": "dublin_semiD_eot", "jsonFile": "dublin_semiD_eot.json" },
		{ "dbCollection": "dublin_house", "jsonFile": "dublin_house.json" },
		{ "dbCollection": "dublin_duplex_terrace", "jsonFile": "dublin_duplex_terrace.json" },
		{ "dbCollection": "dublin_tertiary", "jsonFile": "dublin_unusual.json" }
	];
	let homedir = require('os').homedir().replace(/\\/g, "/");
	filePathToPythonScrapes = homedir + "/PycharmProjects/myHomeScraper/scraper/resultsSplitter"

	var count = 0;
	arr.forEach(element => {
		let rawdata = fs.readFileSync(filePathToPythonScrapes + '/' + element.jsonFile);
		let data = JSON.parse(rawdata);
		for (const [key, propObj] of Object.entries(data)) {
			count++;
			db
				.collection(element.dbCollection)
				.doc(key)
				.set(propObj)
				.then((doc) => {
					console.log("ENTRY SET IN DB: '" + element.dbCollection + "': " + key);
				})
				.catch((err) => {
					console.log("ERR TO DB '" + element.dbCollection + "': " + key);
				});
		}
		console.log(count);
	});


	return response.json({ 'ans': 'ALL APARTMENTS' });
}
