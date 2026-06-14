export default function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message);
  }
}
