
## Food Truck

This is a Food Truck location webapp that provides the user with the locations of Food Trucks in Iceland. Food truck owners can also register their trucks and provide simple information about the service they provide to their customers.

In order to try out the app in your local machine please follow the instructions below:

First, install dependencies:
```bash
npm install
# or
yarn
```
Second, run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Main Technologies used
* [Next.js](https://nextjs.org/)
* [CircleCI](https://circleci.com/)
* [Heroku](https://www.heroku.com/)
* [GoogleMaps API along with Places](https://developers.google.com/maps)

## Dependencies
* Firebase Admin SDK
* MongoDB/Mongoose
* nookies
* react-toastify
* use-places-autocomplete

## Usage
In the current state it is possible for a user to view available food trucks on the Google Map, sign up and create their own food truck. In order for the truck to appear on the map it will have to be approved by an admin. Once it's approved it will be visible for everyone.

We implemented a few internal api route endpoints:

* /api/trucks
  * GET: Returns all of the trucks available
    * Open to all
  * POST: Saves a truck to the database
    * Only logged in users
* /api/truck/[id]
  * GET: Returns a truck with matching ID
    * Open to all
* /api/updateTruckStatus
  * POST: Changes a trucks visibility using id and status passed in the requests body
    * Only available to the app's admins.

Development endpoint:
* /api/setUserAsAdmin
  * GET: Takes in user id and sets or removes admin privelages
    * Not deployed yet