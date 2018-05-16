import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class MatchService {

  BASE_URL: string = 'http://api.football-data.org/v1/competitions/467/fixtures';
  //options: object = { withCredentials: true };

  constructor(private http: Http, private router: Router) { }


  getfixtures() {
    // console.log(user)
    return this.http.get(`${this.BASE_URL}`)
      .map((res) => {
        console.log(res)
        return res.json()
      });
  }
}
// footballdataFactory.getFixtures = function (_params) {

//   var searchData = footballdataSearchDataService.getNew("getFixtures", _params);

//   return $http({
//       method: 'GET',
//       url: searchData.url,
//       params: searchData.object,
//       headers: {
//           'X-Auth-Token': _params.apiKey ? _params.apiKey : apiKey,
//       }
//   });
// };