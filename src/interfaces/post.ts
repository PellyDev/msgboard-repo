export interface IPost {
    author: string
    avatarId: number
    seconds: { seconds: number; nanoseconds: number }
    keyPhrase?: null
    text: string
    title: string
}
