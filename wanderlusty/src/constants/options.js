export const SelectTravelesList = [
    {
        id: 1,
        title: 'Solo Explorer',
        desc: 'A lone adventurer on the move',
        icon: '✈️',
        people: '1 person'
    },
    {
        id: 2,
        title: 'Dynamic Duo',
        desc: 'Two travelers, one journey',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family Fun',
        desc: 'A crew of fun-loving adventurers',
        icon: '👨‍👩‍👧',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends Group',
        desc: 'A pack of thrill-seekers',
        icon: '🎉',
        people: '5 to 10 People'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Keep costs in check',
        icon: '🪙'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Balance comfort with cost',
        icon: '💰'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Indulge without limits',
        icon: '💸'
    },
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location} for {totalDays} Days for {traveler} with a {budget} budget, Give me  Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {noOfDays} days with each day plan with best time to visit in JSON format.'