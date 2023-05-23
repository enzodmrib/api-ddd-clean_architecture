import z from 'zod'
import validator from 'validator'

export class Phone {
  value: string | null

  constructor(value: string | null) {
    if(value !== null) {
      const phoneSchema = z.string().refine(validator.isMobilePhone)
      this.value = phoneSchema.parse(value)
    } else {
      this.value = value
    }
  }
}