# AnYeongHeA
* 2018 Mobile Content Contest Backend Server

* 요청은 POST(FormUrlEncoded)로 처리하였습니다.

* 기본 URL은 http://soylatte.kr:3000 입니다.

## Server Code
### 200

    Success Processing Request
    
### 400

    Bad Request

### 401

    Unauthorized (Login Error)
    
### 403

    Forbidden -> 권한 오류
    
### 404

    URL Not Founded
    
### 409

    Conflict -> 데이터 충돌 (회원가입시 아이디 중복 등)
   
### 500

    Server Error

    
## API DOCUMENT

### Auth 

#### /auth/login (로그인)
>Requiring Params

    schoolName : 학교이름
    schoolNumver : 학번
    birthday : 생년월일
    password : 비밀번호
    
>Return Values
>>Success
    
    HTTP : 200, JSONObject(유저정보)
    
>>Not Founded

    HTTP : 401, {success:false, message:"존재하지 않는 유저입니다."}
    
#### /auth/register (회원가입)
>Requiring Params
    
    username : 이름
    schoolName : 학교이름
    schoolNumver : 학번
    birthday : 생년월일
    password : 비밀번호
    
>Return Values
>>Success

    HTTP : 200, {success:true, "Register Success"}
    
>>Already In Database

    HTTP : 409, {success:false, "Already In Database}
    
