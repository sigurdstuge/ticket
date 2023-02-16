export default function Events() {
	// queryselector
	const filterButton = document.querySelector('.events__filter--button')

	// eventlistener
	filterButton.addEventListener('input', handleFilterButtonInput)

	// handler
	function handleFilterButtonInput() {

		console.log(filterButton.value)
 	}


	// api
	
	async function getEvents() {
		const endpoint = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=aiGwC3SgJ3DbBEQwtB0AjKSLjrU36KAk&city=oslo&genreId=KnvZfZ7vAkJ';
		const response = await fetch(endpoint)
		const result = await response.json()
		const events = result._embedded.events;

		const container = document.querySelector('.events__container');

		events.forEach(event => {
			console.log(event)
			renderEvent(event);
		})

		function renderEvent(event) {
			// create
			const eventContainer = document.createElement('li');

			const imagecontainer = document.createElement('div');
			const image = document.createElement('img');

			const information1 = document.createElement('div');
			const title = document.createElement('p');
			const  artist = document.createElement('p')

			const button = document.createElement('button')

			const information2 = document.createElement('div');
			const date = document.createElement('p')
			const place = document.createElement('p')

			// class
			eventContainer.className = 'events__card'

			imagecontainer.className = 'events__image'

			information1.className = 'events__information'
			title.className = 'events__title'
			 artist.className = 'events__artist'

			information2.className = 'events__information'
			date.className = 'events__date'
			place.className = 'events__place'

			button.className = 'events__button';

			// inner text 
			title.innerText = event.name;
			artist.innerText = 'Karpe, Emilie Nicolas, Vinni'
			date.innerText = '1/7/23 - 3/7/23'
			place.innerText = event.place
			button.innerText = 'Kjøp Billett'

			// src 
			image.src = 'https://images.squarespace-cdn.com/content/v1/5d8a08aa3ec7066969fbf263/1673356058950-XKLWZIVUNFG9SKUOYGJI/sol_2.jpg?format=2500w'

			// append
			imagecontainer.append(image)
			eventContainer.append(imagecontainer)

			information1.append(title)
			information1.append( artist)
			eventContainer.append(information1)

			information2.append(date)
			information2.append(place)
			eventContainer.append(information2)

			eventContainer.append(button)

			container.append(eventContainer)
		}
		
		renderEvent()
	}

	getEvents();
}
 