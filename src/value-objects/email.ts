import z from 'zod'

export class Email {
  value: string

  constructor(value: string) {
    const emailSchema = z.string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email.")

    this.value = emailSchema.parse(value)
  }
}