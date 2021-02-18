# About
CTE is a Collaborative Text Editor with changes history support.

**Everything described below is applied to an MVP version (the end of March (lab3 - lab4))**
## Main flow
![Main flow](https://i.imgur.com/1IZlXtt.png)

## MVP
### Technologies
#### Per feature ([more likely] / [possible options])
- Authorization - session key with cookies / jwt
    - Only with our login/password - no 3rd party services integration
- Sockets - WS
- Diff algorithm - [google/diff-match-patch](https://github.com/google/diff-match-patch)
#### Per service
- Common
    - typescript
    - ??webworkers?? (for computing diff/patch)
- Backend
    - nestjs
- Frontend
    - vuejs (for project structure) + custom component for editor
- Database
    - postgresql
- CI/CD
    - docker
    - github actions
    - digital ocean

## MVP+
1. History storing
2. Custom diff/patch
3. ...

## Project structure
TBA
    
