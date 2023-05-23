export class HistoryDTO {
  userId: string
  page: number

  constructor(userId: string, page: number) {
    this.userId = userId
    this.page = page
  }
}