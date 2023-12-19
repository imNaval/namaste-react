import { SWIGGY_API, corsproxy } from "./constants";
const getRestaurantList = () =>{

    let currentPage = 1;
            // async
{    
    // return fetchData = () => {
    //     // const apiUrl = "https://corsproxy.io/?" + 'https://www.swiggy.com/dapi/restaurants/list/v5';
    //     const apiUrl = corsproxy + SWIGGY_API;


    //       // Data to be sent in the request body
    //     const requestData = {
    //         lat: 24.585445,
    //         lng: 73.712479,
    //         'is-seo-homepage-enabled': true,
    //         page_type: 'DESKTOP_WEB_LISTING',
    //         page: currentPage,
    //         // Add any other necessary parameters
    //     };

    //       // Configure the fetch options for a POST request
    //     const fetchOptions = {
    //         method: 'POST',
    //         headers: {
    //         'Content-Type': 'application/json', // Specify the content type as JSON
    //         // Add any other headers if required
    //         },
    //         body: JSON.stringify(requestData), // Convert the data to JSON format
    //     };

    //       // Make the API request
    //     fetch(apiUrl, fetchOptions)
    //     .then(response => {
    //         if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         // updateUI(data);

    //         console.log(data)

    //         // Check if there is more data available
    //         if (data.hasMore) {
    //         // If more data is available, increment the page number for the next request
    //         currentPage++;
    //         } else {
    //         // If no more data is available, you may choose to disable further requests
    //         // or implement a different strategy based on your application's requirements.
    //         console.log('No more data available');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error fetching data:', error);
    //     });
    // }
}

return async function postData() {
    // Default options are marked with *
    const data = {
                lat: 24.585445,
                lng: 73.712479,
                'is-seo-homepage-enabled': true,
                page_type: 'DESKTOP_WEB_LISTING',
                page: currentPage,
                // Add any other necessary parameters
            };
            const apiUrl = "https://corsproxy.io/?" + 'https://www.swiggy.com/dapi/restaurants/list/v5';
    const response = await fetch(apiUrl, {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data), 
    });
    const json = await response.json();

    // console.log(json)
  }


}

export default getRestaurantList