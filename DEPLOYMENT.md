# 무료 웹 호스팅 서비스 배포 가이드

이 문서는 서울시 지하철 실시간 위치 조회 앱을 다양한 무료 웹 호스팅 서비스에 배포하는 방법을 설명합니다.

## 🚀 추천 서비스 비교

| 서비스 | 무료 플랜 | 배포 속도 | 자동 배포 | React 지원 | 추천도 |
|--------|----------|----------|----------|-----------|--------|
| **Vercel** | ✅ 매우 좋음 | ⚡ 매우 빠름 | ✅ GitHub 연동 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Netlify** | ✅ 좋음 | ⚡ 빠름 | ✅ GitHub 연동 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **GitHub Pages** | ✅ 기본 | 🐌 보통 | ✅ GitHub 연동 | ⭐⭐⭐ | ⭐⭐⭐ |
| **Render** | ✅ 좋음 | 🐌 보통 | ✅ GitHub 연동 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Railway** | ⚠️ 제한적 | ⚡ 빠름 | ✅ GitHub 연동 | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 1. Vercel (가장 추천 ⭐)

### 장점
- React 앱에 최적화
- 매우 빠른 배포 속도
- 자동 HTTPS
- 글로벌 CDN
- 무료 플랜이 매우 관대함
- 커스텀 도메인 지원

### 배포 방법

#### 방법 1: Vercel 웹사이트에서 배포 (가장 간단)

1. **Vercel 가입**
   - [https://vercel.com](https://vercel.com) 접속
   - "Sign Up" 클릭
   - GitHub 계정으로 로그인 (권장)

2. **프로젝트 Import**
   - 대시보드에서 "Add New..." → "Project" 클릭
   - GitHub 저장소 선택: `kccho88/Subway-location`
   - "Import" 클릭

3. **프로젝트 설정**
   - Framework Preset: **Create React App** (자동 감지됨)
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build` (자동 설정됨)
   - Output Directory: `build` (자동 설정됨)
   - Install Command: `npm install` (자동 설정됨)

4. **환경 변수 설정** (필요한 경우)
   - Environment Variables 섹션에서 추가 가능
   - 현재는 API 키가 코드에 하드코딩되어 있어 불필요

5. **Deploy 클릭**
   - 배포가 자동으로 시작됩니다
   - 약 1-2분 후 배포 완료

6. **배포 완료**
   - 자동으로 생성된 URL 확인 (예: `https://subway-location-xxx.vercel.app`)
   - 이후 모든 GitHub 푸시가 자동으로 재배포됩니다

#### 방법 2: Vercel CLI로 배포

```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 디렉토리에서 실행
cd "C:\Users\PC\Desktop\Cursor_ai_exe\Subway location"
vercel

# 첫 배포 시
# - Set up and deploy? Yes
# - Which scope? (개인 계정 선택)
# - Link to existing project? No
# - Project name? subway-location (또는 원하는 이름)
# - Directory? ./
# - Override settings? No

# 이후 업데이트는
vercel --prod
```

### 환경 변수 설정 (필요한 경우)

Vercel 대시보드에서:
1. 프로젝트 선택
2. Settings → Environment Variables
3. 변수 추가 (예: `REACT_APP_API_KEY`)

### 커스텀 도메인 설정

1. Vercel 대시보드 → 프로젝트 → Settings → Domains
2. 원하는 도메인 입력
3. DNS 설정 안내에 따라 도메인 제공업체에서 설정

---

## 2. Netlify

### 장점
- 사용하기 쉬운 인터페이스
- 무료 SSL 인증서
- 폼 처리 기능
- 좋은 무료 플랜

### 배포 방법

#### 방법 1: Netlify 웹사이트에서 배포

1. **Netlify 가입**
   - [https://www.netlify.com](https://www.netlify.com) 접속
   - "Sign up" 클릭
   - GitHub 계정으로 로그인

2. **프로젝트 Import**
   - "Add new site" → "Import an existing project" 클릭
   - GitHub 저장소 선택: `kccho88/Subway-location`
   - "Deploy site" 클릭

3. **빌드 설정** (자동 감지되지만 확인)
   - Build command: `npm run build`
   - Publish directory: `build`
   - Base directory: `./`

4. **배포 완료**
   - 자동으로 생성된 URL 확인 (예: `https://random-name-123.netlify.app`)
   - 이후 모든 GitHub 푸시가 자동으로 재배포됩니다

#### 방법 2: Netlify CLI로 배포

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# 배포
cd "C:\Users\PC\Desktop\Cursor_ai_exe\Subway location"
netlify deploy --prod
```

### Netlify 설정 파일 (선택사항)

프로젝트 루트에 `netlify.toml` 파일 생성:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 3. Render

### 장점
- 무료 플랜 제공
- 자동 배포
- 다양한 서비스 지원

### 배포 방법

1. **Render 가입**
   - [https://render.com](https://render.com) 접속
   - "Get Started for Free" 클릭
   - GitHub 계정으로 로그인

2. **새 Static Site 생성**
   - Dashboard → "New +" → "Static Site"
   - GitHub 저장소 연결: `kccho88/Subway-location`

3. **설정**
   - Name: `subway-location` (또는 원하는 이름)
   - Branch: `main`
   - Build Command: `npm run build`
   - Publish Directory: `build`

4. **Create Static Site 클릭**
   - 배포가 시작됩니다
   - 완료 후 URL 확인

---

## 4. GitHub Pages (이미 배포됨)

현재 프로젝트는 이미 GitHub Pages에 배포되어 있습니다.

### 현재 상태
- URL: [https://kccho88.github.io/Subway-location](https://kccho88.github.io/Subway-location)
- 배포 명령어: `npm run deploy`

### 장점
- GitHub과 완전 통합
- 무료
- 간단한 설정

### 단점
- 상대적으로 느린 배포
- React Router 사용 시 추가 설정 필요

---

## 5. Railway

### 배포 방법

1. **Railway 가입**
   - [https://railway.app](https://railway.app) 접속
   - GitHub 계정으로 로그인

2. **새 프로젝트 생성**
   - "New Project" → "Deploy from GitHub repo"
   - 저장소 선택: `kccho88/Subway-location`

3. **설정**
   - Build Command: `npm run build`
   - Start Command: `npx serve -s build`
   - 또는 Static Site로 설정

---

## 🔧 공통 설정 및 주의사항

### 1. CORS 문제 해결

모든 호스팅 서비스에서 CORS 문제가 발생할 수 있습니다. 해결 방법:

#### 방법 A: CORS 프록시 사용
```javascript
// src/App.js에서
const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/http://swopenAPI.seoul.go.kr/api/subway';
```

#### 방법 B: Vercel/Netlify Functions 사용
- 서버리스 함수를 통해 API 호출
- CORS 헤더를 서버에서 추가

#### 방법 C: 백엔드 프록시 서버 구축
- Node.js Express 서버
- API 요청을 프록시로 전달

### 2. 환경 변수 설정

각 플랫폼에서 환경 변수를 설정할 수 있습니다:

**Vercel:**
- Settings → Environment Variables

**Netlify:**
- Site settings → Build & deploy → Environment variables

**Render:**
- Environment 섹션에서 추가

코드에서 사용:
```javascript
const API_KEY = process.env.REACT_APP_API_KEY || '774a4e43776b6363363248655a6b42';
```

### 3. 자동 배포 설정

모든 서비스는 GitHub와 연동 시 자동 배포를 지원합니다:
- `main` 브랜치에 푸시하면 자동으로 재배포
- Pull Request 생성 시 프리뷰 배포 (Vercel, Netlify)

---

## 📊 서비스별 추천

### 가장 추천: **Vercel** ⭐⭐⭐⭐⭐
- React 앱에 최적화
- 가장 빠른 배포
- 가장 나은 개발자 경험

### 대안: **Netlify** ⭐⭐⭐⭐
- 사용하기 쉬움
- 좋은 무료 플랜
- 폼 처리 등 추가 기능

### 현재 사용 중: **GitHub Pages** ⭐⭐⭐
- 이미 배포됨
- GitHub과 완전 통합
- 추가 설정 불필요

---

## 🚀 빠른 시작: Vercel 배포

가장 빠르고 간단한 방법:

1. [https://vercel.com](https://vercel.com) 접속
2. GitHub로 로그인
3. "Add New..." → "Project"
4. `kccho88/Subway-location` 선택
5. "Deploy" 클릭
6. 완료! 🎉

배포 후 URL은 `https://subway-location-xxx.vercel.app` 형식으로 자동 생성됩니다.

---

## 📝 업데이트 배포

모든 서비스는 GitHub 푸시 시 자동으로 재배포됩니다.

수동 배포가 필요한 경우:

**Vercel:**
```bash
vercel --prod
```

**Netlify:**
```bash
netlify deploy --prod
```

**GitHub Pages:**
```bash
npm run deploy
```

---

## ❓ 문제 해결

### 빌드 실패
- `package.json`의 빌드 스크립트 확인
- 로컬에서 `npm run build` 테스트
- 빌드 로그 확인

### CORS 오류
- 위의 CORS 해결 방법 참고
- 서버리스 함수 사용 고려

### 라우팅 문제 (React Router 사용 시)
- 모든 경로를 `index.html`로 리다이렉트 설정 필요
- Vercel: `vercel.json` 파일 생성
- Netlify: `netlify.toml` 파일 생성

---

## 📚 추가 리소스

- [Vercel 문서](https://vercel.com/docs)
- [Netlify 문서](https://docs.netlify.com)
- [GitHub Pages 문서](https://docs.github.com/pages)
- [Render 문서](https://render.com/docs)

