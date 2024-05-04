export type ServerActionResult<T extends {}> = Promise<
  ({ success: true } & T) | { success: false; message: string }
>
