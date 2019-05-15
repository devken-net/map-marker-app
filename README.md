This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get started

This project requires atleast `node ^8.x.x`.

### Setup
In the project directory, you can run:

```bash
npm install
```

Before you start the project fill the `*_API_KEY`'s in `.env` file.

```text
REACT_APP_GOOGLE_API_KEY=*********************
GOOGLE_API_KEY=*********************
MAPBOX_API_KEY==*********************
```

Then you can run `npm run dev` this will run the app in the development mode and run our backend api in `PORT:3001`.<br>
And we setup proxy server to access api we can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## TODO

* [ ] Add unit tests
* [ ] Separate Front-end and Back-end in separate repos
* [ ] Fix inline TODO's
* [ ] Setup Offline support page.
* [ ] Convert to WebComponents all reusable components.

## Frontend Design

For this project I didn't have the luxury of time to set this project configurations same as my large scale applications that is why I opt-out to use `create-react-app` for faster development but less control (unless I'll execute the `npm run eject`).

First I used `material-design-lite` to have a simple and lightweight styles for our components.
Since `material-design-lite` doesn't have grid system and `css-grid` is not yet supported in most major browsers I used `flex` for now to handle our scaffold.

I also created a couple of reusable components for this app. My plan is to make it as a WebComponent so that we could minimize side-effects of other components and make more independent it since I haven't tried it yet with react before I'll leave it as is for now.

I also used vanilla css over other `css-in-js` and I love to write codes like how I write as plain css/js because technologies move so fast in frontend, all codes that I wrote today will be legacy codes in 3mos or less. But by writing it to be more like *vanilla css/js* I could make my code future proof and not dependent to frameworks. Which could be beneficial for me coz I would have less work for migration to upgrade to other version or frameworks and less work means more for the company. I've seen startups that was killed because of legacy codes and that's the thing we wouldn't want to happen.

## Guideline Questions

1. How do you handle configuration values? What if those values change?
    > Usually we put configuration values in different environment variables files. If those values change we will just rebuilt a new docker image with the new environment variables.

2. What happens if we encounter an error with the third party API-integration?
3. Will it also break our application, or they will handled accordingly?
4. What if we change our third-party geocoder API to another one? How can we make it seamless as possible?
    > Alright. I really love this questions. Based on my experience we should not trust any third-party api's. In this project I applied the pluggable architecture that use in our apps. In pluggable architecture we develop core service (which in this project will be found in [./server/api/locations.js](./server/api/locations.js)) and also [third-party api adapter](./server/api/google-api-adapter.js). Third party adapter should always anticipate scenarios failure of third-party api's and at the same time configure it response to what our app needs. There are different ways to make applications resilient or dependent on third party api's in this project I just return a simple error message following standard response. I also created another adapter for different third-party API that would return same DTO format the we need for our application.
