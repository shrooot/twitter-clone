const BASE_URL = "http://localhost:8080"

const LOGIN_ENDPOINT = BASE_URL + '/user/login'
const SIGNUP_ENDPOINT = BASE_URL + '/user/signup'
const LOGOUT_ENDPOINT = BASE_URL + '/user/logout'
const CHECK_ENDPOINT = BASE_URL + '/user/check'
const FEED_ENDPOINT = BASE_URL + '/user/get-feed'
const USERINFO_ENDPOINT = BASE_URL + '/user/get-userinfo'
const GET_ALL_USERS_ENDPOINT = BASE_URL + '/user/get-all-users'

const CREATE_TWEET_ENDPOINT = BASE_URL + '/tweet/create'
const UPDATE_TWEET_ENDPOINT = BASE_URL + '/tweet/update'
const DELETE_TWEET_ENDPOINT = BASE_URL + '/tweet/delete'
const GET_USER_TWEET_ENDPOINT = BASE_URL + '/tweet/all'
const TWEETBYID_ENDPOINT = BASE_URL + '/tweet/get'

const FOLLOW_ENDPOINT = BASE_URL + '/user/follow'
const UNFOLLOW_ENDPOINT = BASE_URL + '/user/unfollow'
const GET_FOLLOWING_ENDPOINT = BASE_URL + "/user/get-following"

export  {
    LOGIN_ENDPOINT,
    SIGNUP_ENDPOINT,
    LOGOUT_ENDPOINT,
    CHECK_ENDPOINT,
    FEED_ENDPOINT,
    CREATE_TWEET_ENDPOINT,
    UPDATE_TWEET_ENDPOINT,
    DELETE_TWEET_ENDPOINT,
    FOLLOW_ENDPOINT,
    UNFOLLOW_ENDPOINT,
    GET_USER_TWEET_ENDPOINT,
    GET_ALL_USERS_ENDPOINT,
    GET_FOLLOWING_ENDPOINT,
    USERINFO_ENDPOINT,
    TWEETBYID_ENDPOINT,
}