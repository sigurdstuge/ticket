export default function Events() {
	// Data 
	let allEvents = null;
	let allEventsSaved = null; 
	let isNokFiltered = false; 

	// queryselector
	const sortMenu = document.querySelector('.events__filter--button')
	const filterButton = document.querySelector('.events__sort-button')

	// eventlistener
	sortMenu.addEventListener('input', handlesortMenuInput)
	filterButton.addEventListener('click', handlefilterButtonClick)

	// handler
	function handlefilterButtonClick() {
		isNokFiltered = !isNokFiltered;

		if (isNokFiltered) {
			allEvents = allEvents.filter(event => {
				const eventPrice = event.priceRanges[0].min;
	
				if (eventPrice <= 200) {
					return true;
				}
			})
		} else {
			allEvents = allEventsSaved;
		}

		if(isNokFiltered === true) {
			filterButton.classList.add('events__sort-button--active')
		
		} else {
			filterButton.classList.remove('events__sort-button--active')
		}

		renderEvents();
	}
	
	
	function handlesortMenuInput() {
		const currentSorting = sortMenu.value;

		if (currentSorting === 'place') {
			sortEventsPlace();
		} else if (currentSorting === 'price') {
			sortEventsPrice();
		} else if (currentSorting === 'name') {
			sortEventsName();
		} else if (currentSorting === 'date') {
			sortEventsDate();
		} else if (currentSorting === 'all') {
			getEvents();
		}

		renderEvents();
 	}


	// api


	async function getEvents() {
		const endpoint = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=aiGwC3SgJ3DbBEQwtB0AjKSLjrU36KAk&city=oslo';
		const response = await fetch(endpoint)
		const result = await response.json()
		const events = result._embedded.events;
		allEvents = events;
		allEventsSaved = events;
	
		renderEvents();
		console.log(events)
	}


	function sortEventsPrice() {
		allEvents.sort((a, b) => {
			if (a.priceRanges[0].min < b.priceRanges[0].min) {
				return -1;
			} else if (a.priceRanges[0].min > b.priceRanges[0].min) {
				return 1;
			} else {
				return 0;
			}
		})
	}

	function sortEventsName() {
		allEvents.sort((a, b) => {
			if (a.name < b.name) {
				return -1;
			} else if (a.name > b.name) {
				return 1;
			} else {
				return 0;
			}
		})
	}

	function sortEventsPlace() {
		allEvents.sort((a, b) => {
			if (a._embedded.venues[0].name < b._embedded.venues[0].name) {
				return -1;
			} else if (a._embedded.venues[0].name > b._embedded.venues[0].name) {
				return 1;
			} else {
				return 0;
			}
		})
	}

	function sortEventsPlace() {
		allEvents.sort((a, b) => {
			if (a._embedded.venues[0].name < b._embedded.venues[0].name) {
				return -1;
			} else if (a._embedded.venues[0].name > b._embedded.venues[0].name) {
				return 1;
			} else {
				return 0;
			}
		})
	}

	function sortEventsDate() {
		allEvents.sort((a, b) => {
			if (a.dates.start.localDate < b.dates.start.localDate) {
				return -1;
			} else if (a.dates.start.localDate > b.dates.start.localDate) {
				return 1;
			} else {
				return 0;
			}
		})
	}
	
	function renderEvents() {
		const container = document.querySelector('.events__container');
		container.innerHTML = '';
		
		allEvents.forEach(event => {
			// create
			const eventContainer = document.createElement('li');

			const imagecontainer = document.createElement('div');
			const image = document.createElement('img');

			const information1 = document.createElement('div');
			const title = document.createElement('p');
			const price = document.createElement('p')

			const button = document.createElement('button')

			const information2 = document.createElement('div');
			const date = document.createElement('p')
			const place = document.createElement('p')

			// class
			eventContainer.className = 'events__card'

			imagecontainer.className = 'events__image'

			information1.className = 'events__information'
			title.className = 'events__title'
			price.className = 'events__price'

			information2.className = 'events__information'
			date.className = 'events__date'
			place.className = 'events__place'

			button.className = 'events__button';

			// inner text 
			title.innerText = event?.name;
			price.innerText = `${event?.priceRanges[0].min} NOK`;
			date.innerText = event?.dates.start.localDate;
			place.innerText = event?._embedded.venues[0].name;
			button.innerText = 'Kjøp Billett'

			// src 
			image.src = event?.images[0].url;

			// append
			imagecontainer.append(image)
			eventContainer.append(imagecontainer)

			information1.append(title)
			information1.append(price)
			eventContainer.append(information1)

			information2.append(date)
			information2.append(place)
			eventContainer.append(information2)

			eventContainer.append(button)

			container.append(eventContainer)
		})
	}

	getEvents();
}
 