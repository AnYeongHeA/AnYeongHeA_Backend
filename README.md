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
    schoolNumber : 학번
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

### Photobook

#### /photobook/make (사진첩 생성)
>Requiring Params

    name : 사진첩이름
    file : 사진 (사진첩 배경)
    summary : 사진첩설명
    usertoken : 사진첩을 만든 유저의 토큰
    
>Return Values
>>Success

    HTTP : 200, {success:true, message:"사진첩을 새로 생성했습니다."}
    
#### /photobook/list (유저가 작성할수 있는 사진첩 리스트)
>Requiring Params

    usertoken : 로그인 되어있는 유저의 토큰
    
>Return Values
>>Success

    HTTP : 200, JSONArray(사진첩데이터들)
    
#### /photobook/photo/show (사진 상세보기)
>Requiring Params

    url : 사진 url
    
>Return Values
>>Success
    
    HTTP : 200, JSONObject(사진상세정보)
    
    
#### /photobook/photo/add (사진 업로드)
>Requiring Params

    booktoken : 사진첩 토큰
    summary : 사진 설명
    file : 사진
    
>Return Values
>>Success
    
    HTTP : 200, {success:true, message:"사진을 성공적으로 등록했습니다."}
   
#### /photobook/photo/list (사진첩에 있는 사진리스트)
>Requiring Params

    booktoken : 사진첩 토큰

>Return Values
>>Success
     
     HTTP : 200, JSONArray(사진들)
     
#### /photobook/photo/all (DB에 업로드 되어있는 모든 사진리스트)
>Requiring Params

    usertoken : 유저고유토큰
    
>Return Values
>>Success

    HTTP : 200, JSONArray(유저가 소유한 사진 리스트)
    
#### /photobook/search (이름을 이용한 사진첩 검색)
>Requiring Params

    name : 사진첩이름
    
>Return Values
>>Success

    HTTP : 200, JSONArray(검색된 이름의 사진첩들)
  
## Database
### Table
>User Table

    username VARCHAR(100) NOT NULL ,
    schoolName VARCHAR(150) NOT NULL,
    schoolNumber VARCHAR(20) NOT NULL ,
    birthday VARCHAR(20) NOT NULL ,
    password VARCHAR(200) NOT NULL ,
    usertoken VARCHAR(250) NOT NULL
    
>photobook Table (사진첩 테이블)

    name VARCHAR(200) NOT NULL ,
    photo VARCHAR(200) NOT NULL ,
    count INT(11) NOT NULL ,
    summary VARCHAR(250) NOT NULL ,
    since VARCHAR(20) NOT NULL ,
    booktoken VARCHAR(250) NOT NULL,
    usertoken VARCHAR(250) NOT NULL

>photo Table (사진 테이블)

    booktoken VARCHAR(250) NOT NULL ,
    summary VARCHAR(250) NOT NULL ,
    photo VARCHAR(250) NOT NULL
