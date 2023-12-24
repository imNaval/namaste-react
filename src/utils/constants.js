// export const LOGO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZjNJcfRFQ7upiTre6zkP_FEErp1MdSmnng&usqp=CAU";
export const LOGO_URL = "https://png.pngtree.com/png-clipart/20201208/original/pngtree-food-line-logo-design-png-image_5539098.jpg"
export const RES_LOGO = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const SWIGGY_API = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=24.585445&lng=73.712479&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
// export const API_START = "https://www.swiggy.com/dapi/restaurants/list/v5?"
export const API_START = "https://www.swiggy.com/dapi/restaurants/list/v5?"

// // lat=24.585445&lng=73.712479
export const API_END = "is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"

export const MENU_API = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.244308353841273&lng=73.02032813218479&restaurantId=";

export const UNSERVICEABLE_ERROR = "https://cdn0.desidime.com/attachments/photos/936479/medium/Screenshot20230919-002343.png?1695064751"


export const corsproxy = "https://thingproxy.freeboard.io/fetch/"


//more data
export const payload = {
    "lat": 24.585445,
    "lng": 73.712479,
    "nextOffset": "COVCELQ4KIDw8MCw6ZiAfDCnEzgB", //modify once at first post request
    "widgetOffset": {
        "NewListingView_Topical_Fullbleed": "",
        "NewListingView_category_bar_chicletranking_TwoRows": "",
        "NewListingView_category_bar_chicletranking_TwoRows_Rendition": "",
        "Restaurant_Group_WebView_SEO_PB_Theme": "",
        "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": "40", //modify for every post request
        "inlineFacetFilter": "",
        "restaurantCountWidget": ""
    },
    "filters": {},
    "seoParams": {
        "seoUrl": "https://www.swiggy.com/",
        "pageType": "FOOD_HOMEPAGE",
        "apiName": "FoodHomePage"
    },
    "page_type": "DESKTOP_WEB_LISTING",
    "_csrf": "7jcRw5JkjNFW-1JtbNtQwPu5M6m8Artb5E91nr20" //modify once at first post request
}

//https://corsproxy.io/?
//https://cors-anywhere.herokuapp.com/"
//https://thingproxy.freeboard.io/fetch/
//https://cors-proxy.htmldriven.com/?url=

export const SERVER_URL = "https://coder-food-server-imnaval.vercel.app"
// export const SERVER_URL = "http://localhost:3000"


export const payloadForRecipes = {
    "lat": 24.585445,
    "lng": 73.712479,
    "nextOffset": "COVCELQ4KIDw8MCw6ZiAfDCnEzgB", //modify once at first post request
    "widgetOffset": {
        "collectionV5MastheadWidget": "",
        "collectionV5RestaurantListWidget_SimRestoRelevance_food": "23",
        "inlineFacetFilter": "",
        "restaurantCountWidget": ""
    },
    "collection": "83645",
    "filters": "",
    "page_type": null,
    "sortBy": "",
    "tags": "layout_CCS_NorthIndian",
    "type": "rcv2",
    "seoParams": {
        "seoUrl": "https://www.swiggy.com/",
        "pageType": "FOOD_HOMEPAGE",
        "apiName": "FoodHomePage"
    },
    "page_type": "DESKTOP_WEB_LISTING",
    "_csrf": "7jcRw5JkjNFW-1JtbNtQwPu5M6m8Artb5E91nr20" //modify once at first post request
}