# About
CTE is a Collaborative Text Editor with changes history support.

## Demo
Demo is available here - http://cteapp.online/

## Progress
Progress can be tracked [here](https://github.com/Yaroslaww-1/cte/projects/1)

## MVP (the end of March (lab3 - lab4))
### Main flow & Mesurable goals
1. User logs in by entering his email and password. If user is new to editor, he is able to sign up:
- by email & password or by Google (MVP+)
- then user must enter nickname and bio
2. If user uses own email/password then user is also able to reset password: (MVP+)
- user enters Reset password screen
- user enters his email
- if user with entered email is found than link is generated and send to the user email (link is only valid for this user)
- user visits the link
- user enters new password on the Reset password page
3. If user uses own email/password then after logging in for the first time user is promted that he must confirm his email
- user is redirected to the profile page
- user can confirm his email by visiting link from confirm-email letter
4. After confirming his email he is able to:
- see a list of user documents
- see a list of bookmarked documents
- button to create new document
5. Each document has a
- title
- last edit time
and a set of available actions:
- bookmark (save Document in bookmarks block)
- go to Document editing page
- share a link to Document editing page 
    - for editing
    - or for viewing
    - Document's editing is not available if user not authirezed. If he visits editing link than he is promted to login to edit Document
6. On the Document editing page user is able to:
- edit text (as a textarea, no additional elements like MD formatting). When user is writing or editing document the other users are able to see cursor – position of checking that is synchronized
- go to the history page
7. On the History page user is able to:
- see the changes history (like github's pull request diff preview)
- divide changes by users

### Algorithm
![Algorithm](https://user-images.githubusercontent.com/40521835/109118151-a0dca780-774b-11eb-9e68-cd4cac53377e.png)

### Technologies
#### Per feature ([more likely] / [possible options])
- Authorization - session key with cookies / jwt
    - Only with our login/password - no 3rd party services integration
- Sockets - WS
- Diff algorithm - [google/diff-match-patch](https://github.com/google/diff-match-patch)
#### Per service
- Common
    - typescript
    - ??webworkers/worker threads?? (for computing diff/patch)
- Backend
    - nestjs
- Frontend
    - vuejs
- Database
    - postgresql
- CI/CD
    - docker
    - github actions
    - digital ocean container registry + droplet /aws ecr + ec2

### Mockups (inspired by hackmd.io)
![Login](https://user-images.githubusercontent.com/40521835/109047444-91734500-76de-11eb-9025-1c9911556f9b.png)
![Documents page](https://user-images.githubusercontent.com/40521835/109047517-a4861500-76de-11eb-91e3-b17a88e3a6d8.png)
![Editor page](https://user-images.githubusercontent.com/40521835/109047548-abad2300-76de-11eb-80a6-8069542f657a.png)


## MVP+ (lab 6)
1. History storing
2. Custom implementation of diff/patch or different algorithm implementation
3. ...

## Project structure
In progress. Current state is available in [develop branch](https://github.com/Yaroslaww-1/cte/tree/develop)
    
