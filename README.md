# 삼다일기 v1.0.2

### 개발기간

* #### [v1.0.0](https://github.com/acwell94/3dadailyMobile/wiki) <span>2023.02.16 ~ 2023.03.03</span>
* #### [v1.0.1](https://github.com/acwell94/3dadailyMobile/wiki/v1.0.0) <span>2023.03.04 배포</span>
* #### [v1.0.2](https://github.com/acwell94/3dadailyMobile/wiki/v1.0.0) <span>2023.03.05 배포</span>
* #### [v1.0.3](https://github.com/acwell94/3dadailyMobile/wiki/v1.0.0) <span>2023.03.17 배포</span>

##

### 목차
1. [서비스 소개](#-서비스-소개)
2. [사용 기술](#-사용-기술)
3. [기능 소개](#-기능-소개)
4. [배포](#-배포)
5. [History](#-history)

## 📌 서비스 소개
<p align='center'>
<img width='200px' src='https://user-images.githubusercontent.com/89783182/222035863-cd30cc07-2690-47b6-8cc7-7a829d95fd33.png'/>
</p>

🗒️ 간단하게 오늘 하루를 기록하는 삼다일기 앱 버전🗒️<br>
<br>
사이트 : [https://www.3dadaily.store/](https://www.3dadaily.store/)<br>
앱 다운로드 : [https://play.google.com/store/apps/details?id=com.store.dailyleminyoung](https://play.google.com/store/apps/details?id=com.store.dailyleminyoung)

### [개발 배경](https://github.com/acwell94/3dadailyMobile/wiki)

## 📌 사용 기술
<p align='start'>
  <img src='https://img.shields.io/badge/ReactNative-v0.70.5-blue?logo=React'/>
    <img src='https://img.shields.io/badge/Expo-v47.0.12-000020?logo=Expo'/>
  <img src="https://img.shields.io/badge/recoil-v0.7.6-blue?logo=react">
      <img src="https://img.shields.io/badge/axios-v2.9.10-5A29E4?logo=axios">
</p>

## 📌 기능 소개

### 🛠️ 회원가입

<p align='center'>
  <img height="500px" src='https://user-images.githubusercontent.com/89783182/222442688-826b5e46-80b4-442f-9e94-a2a81488b1cc.gif'/>
</p>
* 개인정보 제공 없이 간단히 아이디와 닉네임으로 회원가입이 가능합니다.<br>
* 유저에게서 아이디, 닉네임, 비밀번호, 프로필사진을 받아서 비밀번호는 hash하여 저장, 프로필사진은 AWS에 저장하여 DB에 링크로 저장합니다.
<p align='center'>
  <img src='https://user-images.githubusercontent.com/89783182/222068824-5088d79e-4531-43a8-81b0-6a866c0dbbcf.png'/>
</p>

### 🛠️ 로그인

<p align='center'>
  <img height="500px" src='https://user-images.githubusercontent.com/89783182/222443240-9ada1178-81a9-4373-9cfa-01c425e6ac5d.gif'/>
</p>

* 회원가입시 등록된 정보로 로그인이 가능합니다.<br>
* 간단히 이메일과 비밀번호로 로그인하고 DB에서 확인 후 JWT를 이용하여 AccessToken, RefreshToken을 발급합니다.<br>
* AccessToken은 1시간 RefreshToken은 14일 유지가 되며 1시간이 지난 후 RefreshToken을 이용해 다시 AccessToken을 발급합니다.<br>
<p align='center'>
  <img src='https://user-images.githubusercontent.com/89783182/222075168-7d82cbc6-cd85-430f-b837-2e08c9565734.png'/>
</p>

### 🛠️ 메인 페이지

<p align='center'>
  <img height="500px" src='https://user-images.githubusercontent.com/89783182/222444159-b06fbf2a-7ae5-40ca-91b1-4054789aa941.gif'/>
</p>

* 유저가 작성한 글을 리스트 형식으로 보여주고 조건을 이용하여 검색할 수 있습니다.

### 🛠️ 일기 작성

<p align='center'>
  <img height="500px" src='https://user-images.githubusercontent.com/89783182/222445392-68d447d0-420a-4cee-9383-09a3699a2e79.gif'/>
</p>

* expo-image-manipulator을 이용하여 모바일 기기에서 업로드 하는 이미지를 압축해서 AWS에 저장합니다.<br>
* react-native-maps를 이용하여 지도를 불러오고 react-native-google-places-autocomplete를 이용하여 위치검색을 지원합니다.<br>

### 🛠️ 작성한 일기 수정, 삭제

#### 수정

<p align='center'>
  <img height="500px" src='https://user-images.githubusercontent.com/89783182/222447919-38dc3991-0a0f-416d-8861-221cfec90be0.gif'/>
</p>

#### 삭제

<p align='center'>
  <img height="500px" src='https://user-images.githubusercontent.com/89783182/222448079-f744860b-2647-4207-87e8-d2f11ff0b5bb.gif'/>
</p>

### 🛠️ 설정 페이지

<p align='center'>
  <img height="500px" src='https://user-images.githubusercontent.com/89783182/222448792-d5c8f58e-2cd1-4f4b-b3d7-ba8ee2308f8c.gif'/>
</p>

* 프로필 관리 탭에서 프로필 사진, 닉네임을 변경할 수 있습니다.<br>
* 친구 관리 탭에서 다른 사용자와 친구를 할 수 있습니다.<br>
(친구 일기 보기 기능 추가 예정)
* 비밀번호 재설정 탭에서 비밀번호를 변경할 수 있습니다.<br>
* 회원탈퇴를 하면 유저가 작성한 글을 모두 지우고 삼다일기에서 탈퇴합니다.
(데이터는 복구 불가)

## 📌 배포

### Google Play Console
### React-Native-Expo EAS

## 📌 History

* #### [v1.0.0](https://github.com/acwell94/3dadailyMobile/wiki) <span>2023.03.03 배포</span>
* #### [v1.0.1](https://github.com/acwell94/3dadailyMobile/wiki/v1.0.0) <span>2023.03.04 배포</span>
* #### [v1.0.2](https://github.com/acwell94/3dadailyMobile/wiki/v1.0.0) <span>2023.03.05 배포</span>
* #### [v1.0.3](https://github.com/acwell94/3dadailyMobile/wiki/v1.0.0) <span>2023.03.17 배포</span>

