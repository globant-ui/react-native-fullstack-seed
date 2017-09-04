import request from 'request';
import Promise from 'bluebird';

import TestType from './TestTypeQL';

export default {
  packages: {
    type: TestType,
    resolve: requestCall
  }
};

function requestCall () {
  return new Promise((resolve, reject) => {
    request.get('https://www.thomascook.com/api/packages?allAvailableDates=true&availability=true&campaign=&depAirport=2&end=1&flexible=false&goingTo=Any+destination&occupation=2&origin=Any+London&resortCode=miami-beach-miami-florida-usa&sbDepAirport=2&sort=recommendation_asc&start=0&when=any', function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}
