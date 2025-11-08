// This function checks if an element exists before running page-specific code
function runOnPage(elementId, callback) {
    const element = document.getElementById(elementId);
    if (element) {
        callback(element);
    }
}

// ---------- CODE FROM script.js (for itinerary.html) ----------
runOnPage('defaultPlans', (container) => {
    const itineraries = [
      { id: 1, title: "Cultural Heritage Tour", img: "https://media.istockphoto.com/id/512832839/photo/illuminated-gateway-of-india-mumbai.jpg?s=612x612", details: ["Gateway of India", "Elephanta Caves", "Chhatrapati Shivaji Museum", "Leopold Café", "Marine Drive"], plan: ["Morning: Gateway of India & Elephanta Caves", "Afternoon: Lunch at Leopold Café, explore Chhatrapati Shivaji Museum", "Evening: Marine Drive sunset and dinner at Pizza by the Bay"], price: 2500, days: "1 Day" },
      { id: 2, title: "Bollywood & Beach Day", img: "https://media.istockphoto.com/id/1331957064/photo/film-city-mumbai.jpg?s=612x612", details: ["Film City", "Juhu Beach", "ISKCON Temple", "Bandra Bandstand"], plan: ["Morning: Bollywood studio tour", "Afternoon: Lunch at Juhu Beach stalls, visit ISKCON temple", "Evening: Bandra Bandstand walk & street food"], price: 2800, days: "1 Day" },
      { id: 3, title: "Nature Escape", img: "https://media.istockphoto.com/id/1421661195/photo/sanjay-gandhi-national-park.jpg?s=612x612", details: ["Sanjay Gandhi National Park", "Kanheri Caves", "Powai Lake", "Hanging Gardens", "Chowpatty"], plan: ["Morning: Sanjay Gandhi National Park & Kanheri Caves", "Afternoon: Lunch at Powai Lake", "Evening: Hanging Gardens & Chowpatty snacks"], price: 2000, days: "2 Days / 1 Night" },
      { id: 4, title: "Food Lover’s Trail", img: "https://media.istockphoto.com/id/1183282304/photo/street-food-in-mumbai.jpg?s=612x612", details: ["Crawford Market", "Bademiya", "Mohammad Ali Road", "Girgaum Chowpatty", "Cafe Mondegar"], plan: ["Morning: Breakfast at Cafe Mondegar, shop at Crawford Market", "Afternoon: Try kebabs at Bademiya", "Evening: Street food dinner at Mohammad Ali Road"], price: 2200, days: "1 Day" },
      { id: 5, title: "Shopping Spree", img: "https://media.istockphoto.com/id/1414579650/photo/colaba-causeway-mumbai.jpg?s=612x612", details: ["Colaba Causeway", "Hill Road", "High Street Phoenix", "Linking Road"], plan: ["Morning: Colaba Causeway shopping", "Afternoon: Lunch at Indigo Deli, explore Hill Road", "Evening: Mall visit at High Street Phoenix & Linking Road"], price: 2300, days: "1 Day" },
      { id: 6, title: "South Mumbai Deluxe Tour", img: "https://media.istockphoto.com/id/491218508/photo/marine-drive-in-mumbai.jpg?s=612x612", details: ["Gateway of India", "Taj Mahal Palace", "CST Station", "Nariman Point", "Marine Drive"], plan: ["Morning: Gateway of India & Taj Mahal Palace", "Afternoon: Visit CST heritage building & lunch near Nariman Point", "Evening: Marine Drive sunset view"], price: 3000, days: "2 Days / 1 Night" },
      { id: 7, title: "Adventure & Nature", img: "https://media.istockphoto.com/id/1357601839/photo/kayaking-in-arabian-sea-near-mumbai.jpg?s=612x612", details: ["Mandwa Beach Kayaking", "SGNP Trek", "Powai Lake", "Yeoor Hills"], plan: ["Morning: Ferry to Mandwa & Kayaking adventure", "Afternoon: SGNP trek & Powai Lake lunch", "Evening: Yeoor Hills relaxation"], price: 3200, days: "2 Days / 1 Night" }
    ];

    itineraries.forEach(plan => {
        const routeStops = plan.details.map(place => `<div class="stop"><i class="fa-solid fa-train train-icon"></i><p>${place}</p></div>`).join('<div class="track"></div>');
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<img src="${plan.img}" alt="${plan.title}"><div class="card-content"><div class="title-row"><h3>${plan.title}</h3><span class="days-badge">${plan.days}</span></div><ul>${plan.plan.map(d => `<li>${d}</li>`).join('')}</ul><div class="route">${routeStops}</div><p class="price">₹${plan.price}</p><button onclick="bookItinerary(${plan.id}, '${encodeURIComponent(plan.title)}', ${plan.price})">Book This Itinerary</button></div>`;
        container.appendChild(card);
    });

    // Make functions globally accessible for onclick handlers
    window.bookItinerary = function(id, title, price) {
        window.location.href = `book.html?plan=${title}&price=${price}`;
    };

    const customForm = document.getElementById("customForm");
    if (customForm) {
        customForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const selected = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
            const display = document.getElementById("generatedItinerary");

            if (selected.length === 0) {
                display.innerHTML = "⚠️ Please select at least one interest.";
                return;
            }

            const sampleSpots = {
                "Culture & Heritage": ["Gateway of India", "Mani Bhavan", "CSM Museum"],
                "Food & Markets": ["Crawford Market", "Leopold Café", "Bademiya"],
                "Beaches & Relaxation": ["Juhu Beach", "Versova Beach", "Girgaum Chowpatty"],
                "Shopping": ["Colaba Causeway", "Phoenix Mall", "Linking Road"],
                "Adventure": ["Kayaking at Mandwa", "Cycling Marine Drive", "SGNP Trek"],
                "Nature & Parks": ["Hanging Gardens", "Sanjay Gandhi Park", "Powai Lake"]
            };

            let combined = [];
            selected.forEach(s => combined = combined.concat(sampleSpots[s] || []));
            const price = 3000 + (selected.length * 200);
            const days = selected.length > 2 ? "2 Days / 1 Night" : "1 Day";
            const routeStops = combined.slice(0, 5).map(place => `<div class="stop"><i class="fa-solid fa-train train-icon"></i><p>${place}</p></div>`).join('<div class="track"></div>');

            display.innerHTML = `<div class="card"><img src="https://media.istockphoto.com/id/1252873662/photo/mumbai-skyline.jpg?s=612x612" alt="Custom Mumbai"><div class="card-content"><div class="title-row"><h3>Personalized Mumbai Itinerary</h3><span class="days-badge">${days}</span></div><p><strong>Your interests:</strong> ${selected.join(", ")}</p><div class="route">${routeStops}</div><p class="price">₹${price}</p><button onclick="bookCustom('${selected.join(', ')}', ${price})">Book This Itinerary</button></div></div>`;
        });
    }

    window.bookCustom = function(categories, price) {
        window.location.href = `book.html?custom=${encodeURIComponent(categories)}&price=${price}`;
    };
});

// ---------- CODE FROM book.html ----------
runOnPage('bookingForm', (bookingForm) => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan") || params.get("custom") || "Custom Itinerary";
    const price = params.get("price") || "N/A";

    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;
        const guide = document.getElementById("guide").value;

        document.getElementById("confirmation").style.display = "block";
        document.getElementById("receipt").innerHTML = `<strong>Name:</strong> ${name}<br><strong>Itinerary:</strong> ${plan}<br><strong>Date:</strong> ${date}<br><strong>Guide:</strong> ${guide}<br><strong>Price:</strong> ₹${price}`;
        bookingForm.style.display = "none";

        document.getElementById("downloadPDF").onclick = () => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.setFillColor(0, 119, 182);
            doc.rect(0, 0, 210, 25, "F");
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.text("Mumbai Tourism", 105, 17, { align: "center" });
            doc.setDrawColor(0, 119, 182);
            doc.setLineWidth(1.5);
            doc.rect(15, 35, 180, 110, "S");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(0, 119, 182);
            doc.text("Booking Receipt", 105, 45, { align: "center" });
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.setTextColor(0,0,0);
            const startY = 60;
            const lineHeight = 10;
            doc.text(`Name: ${name}`, 25, startY);
            doc.text(`Itinerary: ${plan}`, 25, startY + lineHeight);
            doc.text(`Date: ${date}`, 25, startY + 2*lineHeight);
            doc.text(`Guide: ${guide}`, 25, startY + 3*lineHeight);
            doc.text(`Price: ₹${price}`, 25, startY + 4*lineHeight);
            doc.setFont("helvetica", "italic");
            doc.setFontSize(11);
            doc.setTextColor(100,100,100);
            doc.text("Thank you for booking with Mumbai Tourism!", 105, 145, { align: "center" });
            doc.save(`${name}_MumbaiTour_Receipt.pdf`);
        };
    });
});

// ---------- CODE FROM places.html ----------
runOnPage('places-container', (container) => {
    const places = [
      { name: "Gateway of India", image: "data:image/jpeg;base64,...", info: "An iconic arch monument..." },
      { name: "Marine Drive", image: "data:image/jpeg;base64,...", info: "Known as the Queen’s Necklace..." },
      // ... (all other places from the original script)
      { name: "Kanheri Caves", image: "data:image/jpeg;base64,...", info: "Ancient Buddhist caves..." }
    ];
    // NOTE: The base64 image data is extremely long and has been shortened for brevity.
    // The full data from your file would be here.

    places.forEach(({name, image, info}, index) => {
        const card = document.createElement('div');
        card.className = index % 2 === 0 ? 'place-card' : 'place-card reverse';
        card.innerHTML = `<img src="${image}" alt="${name}" class="place-image"><div class="place-content"><div class="place-name">${name}</div><div class="place-info">${info}</div></div>`;
        card.addEventListener('click', () => {
            alert("📍 More about " + name + ":\n\n" + info);
        });
        container.appendChild(card);
    });

    const suggestForm = document.getElementById('suggest-form');
    if (suggestForm) {
        suggestForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('placeName').value;
            const location = document.getElementById('placeLocation').value;
            const info = document.getElementById('placeInfo').value;
            console.log("New Place Suggested:", { name, location, info });
            alert("✅ Thank you! Your suggestion has been sent to the admin.");
            e.target.reset();
        });
    }
});


// ---------- CODE FROM weather.html ----------
runOnPage('search-form', () => {
    document.addEventListener('DOMContentLoaded', () => {
        const apiKey = 'fdebd89172864b05916183437251210';
        const searchForm = document.getElementById('search-form');
        // ... (rest of the weather script variables)
        const forecastContainer = document.getElementById('forecast-container');

        const getWeather = async (city) => {
            // ... (rest of the getWeather function)
        };

        // ... (all other functions from the weather script: formatDate, renderToday, renderForecast)
        
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const city = cityInput.value.trim();
            if (city) getWeather(city);
        });
        
        getWeather('Mumbai');
    });
});

// ---------- CODE FOR restaurants.html, cafes.html, street-food.html ----------
runOnPage('locations-container', (container) => {
    // This script will run on any page with a 'locations-container'
    // We need to know which page we're on. A simple way is to check the file name.
    const path = window.location.pathname;

    if (path.includes('restaurants.html')) {
        const data = [ /* ... restaurant data from restaurants.html ... */ ];
        renderFoodCards(data, 'restaurants', 'restaurants-container', 'restaurant-card', 'restaurant-image', 'restaurant-content', 'restaurant-name', 'restaurant-info');
    } else if (path.includes('cafes.html')) {
        const data = [ /* ... cafe data from cafes.html ... */ ];
        renderFoodCards(data, 'cafes', 'cafes-container', 'cafe-card', 'cafe-image', 'cafe-content', 'cafe-name', 'cafe-info');
    } else if (path.includes('street-food.html')) {
        const data = [ /* ... street food data from street-food.html ... */ ];
        renderFoodCards(data, 'items', 'cafes-container', 'cafe-card', 'cafe-image', 'cafe-content', 'cafe-name', 'cafe-info');
    }

    function renderFoodCards(data, itemsKey, itemsContainerClass, itemCardClass, imgClass, contentClass, nameClass, infoClass) {
        data.forEach(locationData => {
            const locationCard = document.createElement('div');
            locationCard.className = 'location-card';

            const locationTitle = document.createElement('h2');
            locationTitle.className = 'location-title';
            locationTitle.textContent = locationData.location;
            locationCard.appendChild(locationTitle);

            const itemsContainer = document.createElement('div');
            itemsContainer.className = itemsContainerClass;

            locationData[itemsKey].forEach(itemData => {
                const itemCard = document.createElement('div');
                itemCard.className = itemCardClass;
                itemCard.innerHTML = `
                    <img class="${imgClass}" src="${itemData.image}" alt="${itemData.name}">
                    <div class="${contentClass}">
                        <div class="${nameClass}">${itemData.name}</div>
                        <div class="${infoClass}">${itemData.info}</div>
                    </div>
                `;
                itemsContainer.appendChild(itemCard);
            });

            locationCard.appendChild(itemsContainer);
            container.appendChild(locationCard);
        });
    }
});