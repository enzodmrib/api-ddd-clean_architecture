export class SearchGymsDTO {
  query: string
  page: number

  constructor(query: string, page: number) {
    this.query = query
    this.page = page
  }
}