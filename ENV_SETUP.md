# Render 환경 변수 설정 가이드

이 가이드는 Render에서 API 키를 환경 변수로 설정하는 방법을 설명합니다.

---

## 🎯 목적

API 키를 코드에 직접 하드코딩하는 대신 환경 변수로 관리하면:
- ✅ 보안 강화
- ✅ 코드와 설정 분리
- ✅ 다른 환경에서 다른 키 사용 가능
- ✅ 키 변경 시 코드 수정 불필요

---

## 📝 Render에서 환경 변수 설정하기

### 방법 1: 배포 시 설정 (처음 배포할 때)

1. **Static Site 생성 화면에서**
   - "New +" → "Static Site" 선택 후
   - 저장소 연결까지 완료

2. **설정 입력 중**
   - Name, Branch, Build Command, Publish Directory 입력
   - 아래로 스크롤하여 **"Environment"** 섹션 찾기

3. **환경 변수 추가**
   - **Key** 입력란에: `REACT_APP_API_KEY`
   - **Value** 입력란에: `774a4e43776b6363363248655a6b42`
   - **"Add"** 또는 **"+"** 버튼 클릭

4. **확인**
   - 추가된 환경 변수가 목록에 표시되는지 확인
   - "Create Static Site" 클릭하여 배포 시작

---

### 방법 2: 배포 후 설정 (이미 배포된 경우)

1. **Render 대시보드 접속**
   - [https://dashboard.render.com](https://dashboard.render.com) 접속
   - 로그인

2. **프로젝트 선택**
   - 배포한 프로젝트 이름 클릭
   - 예: `subway-location`

3. **Environment 탭 클릭**
   - 왼쪽 메뉴에서 **"Environment"** 클릭
   - 또는 Settings → Environment 섹션

4. **환경 변수 추가**
   - **"Add Environment Variable"** 버튼 클릭
   - 또는 **"+"** 버튼 클릭

5. **값 입력**
   - **Key**: `REACT_APP_API_KEY`
   - **Value**: `774a4e43776b6363363248655a6b42`
   - **"Save"** 또는 **"Add"** 클릭

6. **자동 재배포**
   - 환경 변수 추가/수정 시 자동으로 재배포 시작
   - "Deploying..." 상태로 변경됨
   - 완료될 때까지 대기 (약 2-5분)

---

## 🔍 환경 변수 확인하기

### 설정 확인

1. **Render 대시보드 → 프로젝트 → Environment**
2. 추가한 환경 변수 목록 확인
3. Key와 Value가 올바르게 설정되었는지 확인

### 코드에서 확인

코드가 환경 변수를 올바르게 사용하는지 확인:

```javascript
// src/App.js
const API_KEY = process.env.REACT_APP_API_KEY || '774a4e43776b6363363248655a6b42';
```

- 환경 변수가 설정되어 있으면: `process.env.REACT_APP_API_KEY` 사용
- 환경 변수가 없으면: 기본값 `774a4e43776b6363363248655a6b42` 사용

---

## ⚙️ 환경 변수 설정 상세

### 필수 사항

1. **변수 이름 규칙**
   - React 앱에서는 반드시 `REACT_APP_` 접두사 필요
   - 예: `REACT_APP_API_KEY` ✅
   - 예: `API_KEY` ❌ (작동하지 않음)

2. **대소문자 구분**
   - 환경 변수 이름은 대소문자를 구분합니다
   - `REACT_APP_API_KEY`와 `REACT_APP_api_key`는 다릅니다

3. **공백 주의**
   - Key나 Value에 불필요한 공백이 없어야 합니다
   - 복사/붙여넣기 시 주의

### 여러 환경 변수 추가하기

필요한 경우 여러 환경 변수를 추가할 수 있습니다:

```
REACT_APP_API_KEY=774a4e43776b6363363248655a6b42
REACT_APP_API_URL=http://swopenAPI.seoul.go.kr/api/subway
REACT_APP_ENV=production
```

각각 별도로 추가하면 됩니다.

---

## 🔄 환경 변수 변경 후 재배포

### 자동 재배포

- 환경 변수를 추가하거나 수정하면 **자동으로 재배포**가 시작됩니다
- 별도 작업 없이 자동 처리됩니다

### 수동 재배포 (필요한 경우)

1. **Render 대시보드 → 프로젝트**
2. **"Manual Deploy"** 클릭
3. **"Deploy latest commit"** 선택
4. 재배포 시작

---

## 🐛 문제 해결

### 환경 변수가 작동하지 않음

**증상**: 환경 변수를 설정했는데 코드에서 `undefined`로 나옴

**해결 방법**:
1. 변수 이름이 `REACT_APP_`로 시작하는지 확인
2. 환경 변수 추가 후 재배포가 완료되었는지 확인
3. 브라우저 콘솔에서 확인:
   ```javascript
   console.log(process.env.REACT_APP_API_KEY);
   ```
4. 빌드 로그 확인 (Render 대시보드 → Logs)

### 환경 변수가 보이지 않음

**증상**: Environment 탭에서 환경 변수를 찾을 수 없음

**해결 방법**:
1. Settings 탭에서 "Environment" 섹션 확인
2. 왼쪽 메뉴에서 "Environment" 탭 확인
3. 프로젝트 타입 확인 (Static Site인지 확인)

### 재배포가 안 됨

**증상**: 환경 변수 변경 후 재배포가 시작되지 않음

**해결 방법**:
1. "Save" 버튼을 클릭했는지 확인
2. 수동으로 재배포:
   - "Manual Deploy" → "Deploy latest commit"
3. 빌드 로그 확인

---

## 📋 체크리스트

환경 변수 설정 확인:

- [ ] Render 대시보드에 로그인됨
- [ ] 프로젝트 선택됨
- [ ] Environment 탭으로 이동함
- [ ] Key: `REACT_APP_API_KEY` 입력
- [ ] Value: `774a4e43776b6363363248655a6b42` 입력
- [ ] "Add" 또는 "Save" 클릭함
- [ ] 환경 변수가 목록에 표시됨
- [ ] 재배포가 시작됨 (또는 수동 재배포함)
- [ ] 배포 완료 후 사이트에서 정상 작동 확인

---

## 💡 추가 팁

### 환경별 다른 키 사용

- **개발 환경**: 다른 API 키 사용 가능
- **프로덕션 환경**: 실제 API 키 사용
- Render에서는 프로덕션 환경 변수만 설정하면 됩니다

### 보안 권장사항

- ✅ 환경 변수로 API 키 관리
- ✅ GitHub에 API 키를 직접 커밋하지 않기 (이미 하드코딩되어 있지만)
- ✅ 필요시 `.env` 파일을 `.gitignore`에 추가
- ✅ 환경 변수는 Render 대시보드에서만 관리

---

## 📚 관련 문서

- [Render 환경 변수 문서](https://render.com/docs/environment-variables)
- [React 환경 변수 문서](https://create-react-app.dev/docs/adding-custom-environment-variables/)

---

## ✅ 완료!

이제 Render에서 환경 변수를 설정하는 방법을 알았습니다.
환경 변수를 설정하면 API 키를 더 안전하게 관리할 수 있습니다!

