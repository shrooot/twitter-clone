export interface TweetData {
    _id: string,
    text: string,
    user: {
        _id: string,
        username: string,
    },
    imgUrl?: string
    createdAt: string
}

export interface ICreateTweet {
    text: string,
    imgUrl?: string
}

export interface IUpdateTweet {
    text: string,
    imgUrl?: string,
    tweetId: string
}

export interface IUsersList {
    _id: string,
    username: string
}