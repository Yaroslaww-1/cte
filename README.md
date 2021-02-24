# About
CTE is a Collaborative Text Editor with changes history support.

## Progress
Progress can be tracked [here](https://github.com/Yaroslaww-1/cte/projects/1)

## MVP (the end of March (lab3 - lab4))
### Main flow
![Main flow](https://user-images.githubusercontent.com/40521835/109047657-d008ff80-76de-11eb-89a1-23968d973268.png)
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
    
