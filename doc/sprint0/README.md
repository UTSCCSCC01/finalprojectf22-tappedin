# TappedIn

### TappedIn is a social platform that allows users to share their personal information with the simple tap of an NFC tag.

## Motivation

People in today's world are moving at lightning speeds and don't have time to waste relaying their personal information (business/contact info, social media, etc.) to their peers. Using TappedIn, it takes only seconds to share this information with other people. TappedIn holds a users links and bio in a webpage which is connected to a convenient NFC tag so that you can quickly share the info that friends and colleagues need to connect with you.

Whether you're a student, business person, job searcher, job recruiter or anything in between, TappedIn can be leveraged to help you easily exchange information with the people you need to help you succeed!

## Installation
<h3 id='stack'>Stack:</h3>

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)

### To Run Locally:
1. Install [Node.js/npm and MongoDB](#stack) (links provided above)

2. Clone the repo from GitHub:

```bash
git clone https://github.com/UTSCCSCC01/finalprojectf22-tappedin.git
```

Note: The following commands are run from the root directory of the project

3. Install dependencies in each directory

```bash
# front-end
cd tappedin-app
npm install
```

```bash
# back-end
cd tappedin-api
npm install
```

4. Start the back-end

```bash
cd tappedin-api
# dev environment
npm run dev
```

5. Start the front-end

```bash
cd tappedin-app
# dev environment
npm run dev
```

6. The app can be found at `http://localhost:3000`

## Contribution
Contribution is done using GitFlow. Ticketing is done using JIRA.
### Branches:
- `main` branch contains the current production version of the app
- `develop` branch contains development version of the app
- `feature` branches are used to develop features
    - `feature` branches will be named according to the related JIRA ticket number
    - For example, `FT-xx` where `xx` is the ticket number
- Ensure commits have sufficient detail regarding changes made and contain the related ticket number

### Pull Requests:
- Pull Requests will be reviewed by at least 1 other developer
- Ensure Pull Requests have sufficient detail regarding changes that were made