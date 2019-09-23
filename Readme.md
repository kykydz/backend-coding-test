# Project Description

The goal of the project is to log rides activities from start to end point of location. There are several activities covered in this project bundled in 4 API.
Bellow are several decription of API available in this project along with expected payload and response. Base URL serve for all API list bellow is http://localhost:8010

## Check Health

Health endpoint here is aim to serve as the main "home" to test server is running up.

`GET http://localhost:8010/health`

Request

```javascript
GET http://localhost:8010/health
```

Response

```javascript
Healthy;
```

## List all rides

List all rides data. Set limit to -1 offset to 0 to get all data.
`GET http://localhost:8010/rides?start=<startPage>&limit=<maxPerPage>`

Request

```javascript
GET http://localhost:8010/rides?start=0&limit=3
```

Response

```javascript
[
    {
        rideID: 1,
        startLat: 80,
        startLong: 80,
        endLat: 80,
        endLong: 80,
        riderName: 'qwe',
        driverName: 'asd',
        driverVehicle: 'jkh',
        created: '2019-09-23 01:06:42'
    },
    {
        rideID: 2,
        startLat: 80,
        startLong: 80,
        endLat: 80,
        endLong: 80,
        riderName: 'qwe',
        driverName: 'asd',
        driverVehicle: 'jkh',
        created: '2019-09-23 01:06:43'
    },
    {
        rideID: 3,
        startLat: 80,
        startLong: 80,
        endLat: 80,
        endLong: 80,
        riderName: 'qwe',
        driverName: 'asd',
        driverVehicle: 'jkh',
        created: '2019-09-23 01:06:44'
    }
];
```

## Get specific ride data

Show ride data with specific <:id>. Bellow are the example of request and response of the API call.
`GET http://localhost:8010/ride/:id`

Request

```javascript
GET http://localhost:8010/ride/2
```

Response

```javascript
[
    {
        rideID: 2,
        startLat: 80,
        startLong: 80,
        endLat: 80,
        endLong: 80,
        riderName: 'rider_koko',
        driverName: 'driver_koko',
        driverVehicle: 'vehicle_jet12',
        created: '2019-09-21 07:05:19'
    }
];
```

## Add ride data

Add ride with payload. Below is the example request method and response:

`POST http://localhost:8010/rides`

Request

```javascript
headers:{
    Content-Type: "application/json"
}

body:{
	start_lat:80,
	end_lat:80,
	start_long:80,
	end_long:80,
	rider_name:"rider_kiki",
	driver_name:"driver_koko",
	driver_vehicle:"vehicle_jet12"
}
```

Response

```javascript
[
    {
        rideID: 2,
        startLat: 80,
        startLong: 80,
        endLat: 80,
        endLong: 80,
        riderName: 'rider_koko',
        driverName: 'driver_koko',
        driverVehicle: 'vehicle_jet12',
        created: '2019-09-21 07:05:19'
    }
];
```
