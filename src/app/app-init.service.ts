
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23

import { Injectable }  from '@angular/core';

@Injectable()
export class AppInitService {

    constructor() {
    }

    Init() {

        return new Promise<void>((resolve, reject) => {
            console.log("AppInitService.init() called");
            ////do your initialisation stuff here
            setTimeout(() => {
                console.log('AppInitService Finished');
                resolve();
            }, 6000);

        });
    }
}
