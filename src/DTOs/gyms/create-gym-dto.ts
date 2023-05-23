export class CreateGymDTO {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number

  constructor(title: string, description: string | null, phone: string | null, latitude: number, longitude: number) {
    this.title = title
    this.description = description
    this.phone = phone
    this.latitude = latitude
    this.longitude = longitude
  }
}