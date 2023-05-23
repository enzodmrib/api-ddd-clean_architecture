
export class FetchNearbyGymsDTO {
  userLatitude: number
  userLongitude: number

  constructor(userLatitude: number, userLongitude: number) {
    this.userLatitude = userLatitude
    this.userLongitude = userLongitude
  }
}