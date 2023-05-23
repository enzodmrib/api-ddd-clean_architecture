export class CheckInDTO {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number

  constructor(userId: string, gymId: string, userLatitude: number, userLongitude: number) {
    this.userId = userId
    this.gymId = gymId
    this.userLatitude = userLatitude
    this.userLongitude = userLongitude
  }
}