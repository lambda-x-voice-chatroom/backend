# API Documentation

#### Backend delpoyed at [Lambda Voice Chat Backend](https://lambda-voice-chat.herokuapp.com/) <br>

## Getting started

To get the server running locally:

-   Clone this repo
-   **yarn install** to install all required dependencies
-   **yarn server** to start the local server
-   **yarn test** to start server using testing environment

## Endpoints

#### Authentication Routes

| Method | Endpoint          | Access Control | Description                                                   |
| ------ | ----------------- | -------------- | ------------------------------------------------------------- |
| GET    | [`/auth`](#/auth) | all users      | Returns user from database. Creates user if it doesn't exist. |

#### User Routes

| Method | Endpoint          | Access Control      | Description                 |
| ------ | ----------------- | ------------------- | --------------------------- |
| GET    | [`/user`](#/user) | Authorization Token | Returns user from database. |
| PUT    | [`/user`](#/user) | Authorization Token | Updates user.               |
| DELETE | [`/user`](#/user) | Authorization Token | Deletes user.               |

#### Group Routes

| Method | Endpoint                                   | Access Control      | Description                                                     |
| ------ | ------------------------------------------ | ------------------- | --------------------------------------------------------------- |
| GET    | [`/groups`](#/groups)                      | Authorization Token | Returns all groups user is a part of.                           |
| POST   | [`/groups`](#/groups)                      | Authorization Token | Creates a new group. Sets user as owner.                        |
| GET    | [`/groups/:id`](#groups/id)                | Authorization Token | Returns specified group & members of the group.                 |
| PUT    | [`/groups/:id`](#groups/:id)               | Authorization Token | Updates group name.                                             |
| DELETE | [`/groups/:id`](#groups/:id)               | Authorization Token | Deletes the group.                                              |
| POST   | [`/groups/:id/invite`](#groups/:id/invite) | Authorization Token | Invites users via email to a group. Send via an array of email? |

# Data Requests & Responses

## Authentication Routes

### `/auth`

**Method:** GET

```
{
  data: {
    accountBalance: "0.00"
    avatar: "https://lh6.googleusercontent.com/-iHzxfFM_-68/AAAAAAAAAAI/AAAAAAAAAa0/C3lvNfpLzFE/photo.jpg"
    billingSubscription: "free"
    callStatus: false
    createdAt: "2019-07-26T22:27:50.057Z"
    displayName: "Michael Landers"
    email: "landers.mike@gmail.com"
    firstName: null
    id: "Ufr9cfSwbDXKfmAWSGiBzs831Zi1"
    last4: null
    lastName: null
    phoneNumber: null
    stripeId: null
  }
  message: "success"
}
```

## User Routes

### `/user`

**Method:** GET

```
{
  data: {
    accountBalance: "0.00"
    avatar: "https://lh6.googleusercontent.com/-iHzxfFM_-68/AAAAAAAAAAI/AAAAAAAAAa0/C3lvNfpLzFE/photo.jpg"
    billingSubscription: "free"
    callStatus: false
    createdAt: "2019-07-26T22:27:50.057Z"
    displayName: "Michael Landers"
    email: "landers.mike@gmail.com"
    firstName: null
    id: "Ufr9cfSwbDXKfmAWSGiBzs831Zi1"
    last4: null
    lastName: null
    phoneNumber: null
    stripeId: null
  }
  message: "success"
}
```

**Method:** PUT

### Request

```
{
  name: 'Jane Doe',
}
```

### Response

```
{
  data: {
    accountBalance: "0.00"
    avatar: "https://lh6.googleusercontent.com/-iHzxfFM_-68/AAAAAAAAAAI/AAAAAAAAAa0/C3lvNfpLzFE/photo.jpg"
    billingSubscription: "free"
    callStatus: false
    createdAt: "2019-07-26T22:27:50.057Z"
    displayName: "Michael Landers"
    email: "landers.mike@gmail.com"
    firstName: null
    id: "Ufr9cfSwbDXKfmAWSGiBzs831Zi1"
    last4: null
    lastName: null
    phoneNumber: null
    stripeId: null
  }
  message: "success"
}
```

**Method:** DELETE

## Group Routes

### `/groups`

**Method:** GET

```
{
  "owned": [
      {
          "callStatus": false,
          "groupId": 29,
          "groupName": "Test Group"
      },
      {
          "callStatus": false,
          "groupId": 29,
          "groupName": "Test Group"
      }
  ],
  "belonged": [
      {
          "callStatus": false,
          "groupId": 29,
          "groupName": "Test Group"
      },
      {
          "callStatus": false,
          "groupId": 29,
          "groupName": "Test Group"
      }
  ],
  "invited": [
      {
          "callStatus": false,
          "groupId": 29,
          "groupName": "Test Group"
      },
      {
          "callStatus": false,
          "groupId": 29,
          "groupName": "Test Group"
      }
  ]
}
```

**Method:** POST

```
{
  groupName: 'Group Name'
}
```

### `/groups/:id`

**Method:** GET

```
{

}
```

### `/groups/:id`

**Method:** PUT

```
{
  groupName: 'Group Name'
}
```

**Method:** DELETE

### `/groups/:id/invite`

**Method:** POST

```
{

}
```

<!--
## Actions

`getOrgs()` - Returns all organizations

`getOrg(orgId)` - Returns a single organization by ID

`addOrg(org)` - Returns the created org

`updateOrg(orgId)` - Update an organization by ID

`deleteOrg(orgId)` - Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` - if no param all users

`getUser(userId)` - Returns a single user by user ID

`addUser(user object)` - Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` - Updates a single user by ID.

`deleteUser(userId)` - deletes everything dependent on the user -->

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app

_ STAGING_DB - optional development db for using functionality not available in SQLite
_ NODE\*ENV - set to "development" until ready for "production"

-   JWT*SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-_=+)') for i in range(50)])
    _ SENDGRID_API_KEY - this is generated in your Sendgrid account \* stripe_secret - this is generated in the Stripe dashboard

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

-   Check first to see if your issue has already been reported.
-   Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
-   Create a live example of the problem.
-   Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

-   Ensure any install or build dependencies are removed before the end of the layer when doing a build.
-   Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
-   Ensure that your code conforms to our existing code conventions and test coverage.
-   Include the relevant issue number, if applicable.
-   You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/lambda-x-voice-chatroom/frontend)
See [Android Documentation](https://github.com/lambda-x-voice-chatroom/android)
