/* const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai"); */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Travel Plan for Location: Las Vegas for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50-$100 per night\",\n      \"hotelImageUrl\": \"https://www.the-d.com/media/wysiwyg/images/hero-images/hotel-exterior-day.jpg\",\n      \"geoCoordinates\": \"36.1699° N, 115.1423° W\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"A budget-friendly hotel located in the heart of Fremont Street, offering a casino, restaurants, and a pool.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"$40-$80 per night\",\n      \"hotelImageUrl\": \"https://www.circuscircus.com/media/wysiwyg/images/hero-images/hotel-exterior-day.jpg\",\n      \"geoCoordinates\": \"36.1121° N, 115.1723° W\",\n      \"rating\": \"3 stars\",\n      \"description\": \"A classic Las Vegas hotel known for its circus-themed attractions, affordable rooms, and a large casino.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Las Vegas\",\n      \"hotelAddress\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$60-$120 per night\",\n      \"hotelImageUrl\": \"https://www.goldennugget.com/images/header/GNLV-Hero-Header.jpg\",\n      \"geoCoordinates\": \"36.1697° N, 115.1419° W\",\n      \"rating\": \"4 stars\",\n      \"description\": \"A stylish hotel with a historic feel, featuring a large casino, a pool with a shark tank, and several dining options.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"bestTimeToVisit\": \"Morning\",\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"A pedestrian mall with a giant video screen, live entertainment, and numerous casinos.\",\n          \"placeImageUrl\": \"https://www.vegasexperience.com/wp-content/uploads/2019/11/Fremont-Street-Experience-Las-Vegas-Nevada.jpg\",\n          \"geoCoordinates\": \"36.1698° N, 115.1420° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"2-3 hours\"\n        },\n        {\n          \"placeName\": \"Neon Museum\",\n          \"placeDetails\": \"A museum showcasing historic Las Vegas neon signs.\",\n          \"placeImageUrl\": \"https://www.neonmuseum.org/wp-content/uploads/2019/09/Neon-Museum-Homepage-Hero-Image-2.jpg\",\n          \"geoCoordinates\": \"36.1711° N, 115.1391° W\",\n          \"ticketPricing\": \"$20-$30 per person\",\n          \"timeToTravel\": \"1-2 hours\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"bestTimeToVisit\": \"Afternoon\",\n      \"plan\": [\n        {\n          \"placeName\": \"The Strip\",\n          \"placeDetails\": \"The famous boulevard lined with casinos, hotels, and attractions.\",\n          \"placeImageUrl\": \"https://www.visitlasvegas.com/media/images/Las-Vegas-Strip-Aerial.jpg\",\n          \"geoCoordinates\": \"36.1045° N, 115.1726° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"3-4 hours\"\n        },\n        {\n          \"placeName\": \"Bellagio Fountains\",\n          \"placeDetails\": \"A spectacular water and light show in front of the Bellagio Hotel.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/media/images/bellagio-fountains-show.jpg\",\n          \"geoCoordinates\": \"36.1120° N, 115.1728° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"1 hour\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"bestTimeToVisit\": \"Morning\",\n      \"plan\": [\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"A scenic desert landscape with hiking trails and rock formations.\",\n          \"placeImageUrl\": \"https://www.nps.gov/redr/planyourvisit/images/red-rock-canyon-entrance.jpg\",\n          \"geoCoordinates\": \"36.2006° N, 115.2239° W\",\n          \"ticketPricing\": \"$15 per vehicle\",\n          \"timeToTravel\": \"3-4 hours\"\n        },\n        {\n          \"placeName\": \"Hoover Dam\",\n          \"placeDetails\": \"A historic dam on the Colorado River, offering tours and stunning views.\",\n          \"placeImageUrl\": \"https://www.nps.gov/hove/learn/nature/images/hoover_dam_from_above.jpg\",\n          \"geoCoordinates\": \"36.0173° N, 114.9782° W\",\n          \"ticketPricing\": \"Free to enter, tours available for purchase\",\n          \"timeToTravel\": \"2-3 hours\"\n        }\n      ]\n    }\n  }\n}\n```\n\n**Explanation:**\n\n**Hotel Options:**\n\n* This section provides three budget-friendly hotel options with details like address, price, images, coordinates, ratings, and descriptions.\n\n**Itinerary:**\n\n* This section is structured for 3 days. Each day has:\n    * **bestTimeToVisit:** A suggestion for the ideal time to visit the places on that day.\n    * **plan:** An array of places to visit with details like:\n        * **placeName:** The name of the attraction.\n        * **placeDetails:** A brief description of the place.\n        * **placeImageUrl:** A link to an image of the place.\n        * **geoCoordinates:** Coordinates for easy location finding.\n        * **ticketPricing:** Information about entry fees.\n        * **timeToTravel:** A suggested duration for visiting each place.\n\n**Things to Consider:**\n\n* **Transportation:** Las Vegas is a car-friendly city, but consider using ride-sharing services or public transportation to save on parking fees.\n* **Food:** Take advantage of free buffets at casinos or pack snacks and drinks to keep costs down.\n* **Activities:** Many attractions offer free or discounted entry during specific times or days.\n* **Flexibility:** Be prepared to adjust your itinerary based on weather, crowds, or unexpected costs.\n\n**Additional Tips:**\n\n* Visit the Las Vegas Convention and Visitors Authority website for additional deals and discounts.\n* Look for free shows and entertainment, especially on Fremont Street.\n* Consider purchasing a Las Vegas Strip pass for discounted access to various attractions.\n* Don't be afraid to explore off-Strip areas for a more authentic Las Vegas experience.\n" },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
