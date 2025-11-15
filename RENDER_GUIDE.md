# Render 배포 가이드 - 단계별 설명

이 가이드는 서울시 지하철 실시간 위치 조회 앱을 Render에 배포하는 방법을 단계별로 설명합니다.

---

## 📋 준비사항

- GitHub 저장소: `https://github.com/kccho88/Subway-location`
- GitHub 계정
- 이메일 주소 (Render 가입용)

---

## 🚀 단계별 배포 방법

### 1단계: Render 가입하기

1. **Render 웹사이트 접속**
   - 브라우저에서 [https://render.com](https://render.com) 접속

2. **가입하기**
   - 우측 상단의 **"Get Started for Free"** 버튼 클릭
   - 또는 **"Sign Up"** 버튼 클릭

3. **GitHub 계정으로 로그인 (권장)**
   - **"Continue with GitHub"** 버튼 클릭
   - GitHub 로그인 화면에서 계정 정보 입력
   - GitHub에서 Render 앱 권한 승인 클릭
   
   > 💡 **팁**: GitHub 계정으로 로그인하면 저장소 연결이 자동으로 됩니다!

---

### 2단계: 새 Static Site 생성하기

1. **대시보드에서 새 서비스 추가**
   - Render 대시보드 메인 화면에서
   - **"New +"** 버튼 클릭 (화면 상단 또는 중앙)
   - 드롭다운 메뉴에서 **"Static Site"** 선택

   > 📌 **참고**: Static Site는 React, Vue, Angular 같은 정적 웹사이트를 배포하는 서비스입니다.

---

### 3단계: GitHub 저장소 연결하기

1. **저장소 선택**
   - "Connect a repository" 섹션에서
   - **"Connect account"** 또는 **"Configure account"** 클릭 (처음 사용 시)
   - GitHub 저장소 목록에서 **`kccho88/Subway-location`** 찾기
   - 저장소 옆의 **"Connect"** 버튼 클릭

2. **저장소가 보이지 않는 경우**
   - "Configure account" 클릭
   - GitHub에서 권한 승인
   - 저장소 목록 새로고침

---

### 4단계: 프로젝트 설정하기

다음 정보를 입력하세요:

#### 필수 설정

1. **Name (이름)**
   - 예: `subway-location`
   - 또는 원하는 이름 입력
   - URL에 사용됩니다: `https://subway-location.onrender.com`

2. **Branch (브랜치)**
   - `main` 선택 (또는 `master`)
   - 기본값이 `main`이면 그대로 두면 됩니다

3. **Install Command (설치 명령어)** ⚠️ **중요**
   ```
   npm install
   ```
   - 의존성 패키지를 설치하는 명령어
   - 이 명령어가 없으면 `react-scripts: not found` 에러 발생

4. **Build Command (빌드 명령어)**
   ```
   npm run build
   ```
   - 이 명령어로 React 앱이 빌드됩니다

5. **Publish Directory (배포 디렉토리)**
   ```
   build
   ```
   - 빌드된 파일이 들어있는 폴더 이름
   - React는 기본적으로 `build` 폴더에 빌드됩니다

#### 선택 설정 (기본값으로 두면 됨)

- **Root Directory**: 비워두기 (프로젝트 루트에서 빌드)
- **Environment**: Production (기본값)
- **Auto-Deploy**: Yes (기본값) - GitHub 푸시 시 자동 배포

#### 🔑 환경 변수 설정 (API 키 등)

**중요**: API 키를 환경 변수로 설정하려면:

1. **"Environment" 섹션 찾기**
   - 설정 화면에서 아래로 스크롤
   - "Environment" 또는 "Environment Variables" 섹션 찾기

2. **환경 변수 추가**
   - **Key**: `REACT_APP_API_KEY`
   - **Value**: `774a4e43776b6363363248655a6b42`
   - **"Add"** 또는 **"+"** 버튼 클릭

3. **설정 확인**
   - 추가된 환경 변수가 목록에 표시되는지 확인
   - 여러 개 추가 가능

> 💡 **참고**: 
> - React 앱에서는 환경 변수 이름이 `REACT_APP_`로 시작해야 합니다
> - 환경 변수를 추가한 후에는 재배포가 필요합니다
> - 환경 변수는 빌드 시점에 코드에 포함됩니다

---

### 5단계: 배포 시작하기

1. **설정 확인**
   - 모든 설정이 올바른지 확인
   - 특히 Build Command와 Publish Directory 확인

2. **"Create Static Site" 버튼 클릭**
   - 화면 하단의 파란색 버튼 클릭

3. **배포 진행 확인**
   - "Building..." 상태로 변경됨
   - 빌드 로그가 실시간으로 표시됩니다
   - 약 2-5분 소요

---

### 6단계: 배포 완료 확인하기

1. **배포 완료 대기**
   - 상태가 "Live"로 변경되면 완료
   - 초록색 체크 표시가 나타납니다

2. **URL 확인**
   - 화면 상단에 생성된 URL 확인
   - 예: `https://subway-location.onrender.com`
   - 또는 `https://subway-location-xxx.onrender.com`

3. **웹사이트 접속 테스트**
   - URL을 클릭하거나 브라우저에 입력
   - 앱이 정상적으로 작동하는지 확인

---

## ✅ 배포 완료!

이제 웹사이트가 인터넷에 공개되었습니다!

### 배포된 사이트 정보

- **URL**: `https://[프로젝트이름].onrender.com`
- **자동 배포**: GitHub에 푸시하면 자동으로 재배포됩니다
- **무료 플랜**: 무료로 사용 가능 (일부 제한 있음)

---

## 🔄 업데이트 배포하기

코드를 수정한 후:

1. **GitHub에 푸시**
   ```bash
   git add .
   git commit -m "업데이트 내용"
   git push origin main
   ```

2. **자동 배포**
   - Render가 자동으로 변경사항 감지
   - 자동으로 재배포 시작
   - 약 2-5분 후 업데이트 완료

3. **수동 배포 (필요한 경우)**
   - Render 대시보드에서
   - "Manual Deploy" → "Deploy latest commit" 클릭

---

## ⚙️ 설정 확인 및 수정

배포 후 설정을 변경하려면:

1. Render 대시보드에서 프로젝트 클릭
2. "Settings" 탭 클릭
3. 원하는 설정 수정
4. "Save Changes" 클릭

### 주요 설정 항목

- **Name**: 프로젝트 이름 (URL 변경)
- **Branch**: 배포할 브랜치
- **Build Command**: 빌드 명령어
- **Publish Directory**: 배포 디렉토리
- **Auto-Deploy**: 자동 배포 활성화/비활성화
- **Environment Variables**: 환경 변수 (API 키 등)

### 🔑 환경 변수 추가/수정하기

배포 후에도 환경 변수를 추가하거나 수정할 수 있습니다:

1. **Render 대시보드에서 프로젝트 선택**
   - 프로젝트 이름 클릭

2. **"Environment" 탭 클릭**
   - 왼쪽 메뉴에서 "Environment" 선택
   - 또는 Settings → Environment 섹션

3. **환경 변수 추가**
   - **Key**: `REACT_APP_API_KEY`
   - **Value**: `774a4e43776b6363363248655a6b42`
   - **"Add"** 버튼 클릭

4. **저장 및 재배포**
   - 환경 변수 추가 후 자동으로 재배포 시작
   - 또는 "Manual Deploy" → "Deploy latest commit" 클릭

> ⚠️ **주의**: 
> - 환경 변수를 변경하면 자동으로 재배포됩니다
> - 빌드가 완료될 때까지 몇 분 기다려야 합니다
> - 환경 변수는 빌드 시점에 코드에 포함되므로, 변경 후 재빌드가 필요합니다

---

## 🐛 문제 해결

### 빌드 실패 - "react-scripts: not found" 에러

**증상**: `sh: 1: react-scripts: not found` 에러 발생

**원인**: Render에서 `npm install`이 자동으로 실행되지 않음

**해결 방법**:

1. **Render 대시보드에서 프로젝트 선택**
   - 프로젝트 이름 클릭

2. **Settings 탭 클릭**
   - 왼쪽 메뉴에서 "Settings" 선택

3. **Install Command 추가**
   - "Build & Deploy" 섹션 찾기
   - **"Install Command"** 필드에 다음 입력:
     ```
     npm install
     ```
   - 또는 빈 필드가 보이지 않으면 "Advanced" 옵션 확장

4. **Build Command 확인**
   - **"Build Command"** 필드에 다음이 있는지 확인:
     ```
     npm run build
     ```

5. **저장 및 재배포**
   - "Save Changes" 클릭
   - 자동으로 재배포 시작
   - 또는 "Manual Deploy" → "Deploy latest commit"

### 일반적인 빌드 실패

**증상**: 배포가 실패하고 빌드 에러 발생

**해결 방법**:
1. 빌드 로그 확인 (Render 대시보드에서)
2. 로컬에서 테스트:
   ```bash
   npm install
   npm run build
   ```
3. `package.json`의 빌드 스크립트 확인
4. Install Command가 `npm install`인지 확인
5. Build Command가 `npm run build`인지 확인
6. Publish Directory가 `build`인지 확인

### 사이트가 표시되지 않음

**증상**: URL 접속 시 빈 화면 또는 404 에러

**해결 방법**:
1. Publish Directory가 `build`로 설정되어 있는지 확인
2. 빌드가 성공적으로 완료되었는지 확인
3. 브라우저 캐시 삭제 후 다시 시도
4. 배포 로그에서 에러 확인

### CORS 오류

**증상**: 브라우저 콘솔에 CORS 관련 에러

**해결 방법**:
- Render는 Static Site이므로 CORS 문제가 발생할 수 있습니다
- 자세한 해결 방법은 `DEPLOYMENT.md`의 CORS 문제 해결 섹션 참고

### 배포가 느림

**증상**: 배포에 5분 이상 소요

**해결 방법**:
- 무료 플랜의 제한일 수 있습니다
- 빌드 시간은 프로젝트 크기에 따라 다릅니다
- 정상적인 현상입니다 (무료 플랜은 약간 느릴 수 있음)

---

## 📊 Render 무료 플랜 제한사항

- ✅ 무료 SSL 인증서
- ✅ 자동 배포
- ✅ 커스텀 도메인 지원
- ⚠️ 15분간 요청이 없으면 서비스가 "sleep" 상태로 전환
- ⚠️ 첫 요청 시 깨우는데 약간의 시간 소요 (약 30초)
- ⚠️ 월간 트래픽 제한 (일반적으로 충분함)

> 💡 **팁**: Sleep 문제를 피하려면 유료 플랜을 사용하거나, 다른 서비스(Vercel, Netlify)도 고려해보세요.

---

## 🔗 유용한 링크

- [Render 공식 문서](https://render.com/docs)
- [Render Static Sites 가이드](https://render.com/docs/static-sites)
- [프로젝트 GitHub 저장소](https://github.com/kccho88/Subway-location)

---

## 📝 체크리스트

배포 전 확인사항:

- [ ] GitHub 저장소가 공개되어 있음 (또는 Render에 권한 부여됨)
- [ ] `package.json`에 `build` 스크립트가 있음
- [ ] 로컬에서 `npm run build`가 성공적으로 실행됨
- [ ] `build` 폴더가 생성됨
- [ ] Render 계정 생성 완료
- [ ] GitHub 저장소 연결 완료

---

## 🎉 완료!

이제 Render에 배포하는 방법을 알았습니다. 
문제가 발생하면 Render 대시보드의 로그를 확인하거나, 위의 문제 해결 섹션을 참고하세요.

**행운을 빕니다!** 🚀

