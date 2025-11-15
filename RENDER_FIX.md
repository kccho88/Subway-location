# Render 빌드 에러 수정 가이드

## 🚨 에러: "react-scripts: not found"

### 문제 상황
```
sh: 1: react-scripts: not found
==> Build failed 😔
```

### 원인
Render에서 `npm install`이 자동으로 실행되지 않아서 `react-scripts` 패키지가 설치되지 않았습니다.

---

## ✅ 해결 방법

### 방법 1: Render 대시보드에서 설정 수정 (권장)

1. **Render 대시보드 접속**
   - [https://dashboard.render.com](https://dashboard.render.com)
   - 로그인

2. **프로젝트 선택**
   - 실패한 프로젝트 이름 클릭
   - 예: `subway-location`

3. **Settings 탭 클릭**
   - 왼쪽 메뉴에서 **"Settings"** 클릭
   - 또는 상단 탭에서 "Settings" 선택

4. **Build & Deploy 섹션 찾기**
   - 아래로 스크롤하여 "Build & Deploy" 섹션 찾기
   - 또는 "Advanced" 버튼 클릭하여 확장

5. **Build Command 수정** ⚠️ **가장 중요!**
   - **"Build Command"** 필드 찾기
   - 기존 값이 `npm run build`라면 다음으로 변경:
     ```
     npm install && npm run build
     ```
   - **주의**: `npm install`을 포함해야 합니다!
   - `&&`로 두 명령어를 연결
   - Render Static Site는 Install Command를 별도로 지원하지 않을 수 있음

7. **Publish Directory 확인**
   - **"Publish Directory"** 필드 확인
   - 다음이 입력되어 있는지 확인:
     ```
     build
     ```

8. **저장**
   - 화면 하단의 **"Save Changes"** 버튼 클릭
   - 또는 변경사항이 자동 저장되는 경우 확인

9. **재배포**
   - 자동으로 재배포가 시작됩니다
   - 또는 **"Manual Deploy"** → **"Deploy latest commit"** 클릭

---

### 방법 2: 새로 배포하기 (기존 프로젝트 삭제 후)

기존 프로젝트를 삭제하고 처음부터 다시 배포:

1. **기존 프로젝트 삭제**
   - Render 대시보드에서 프로젝트 선택
   - Settings → 맨 아래 "Delete Service" 클릭
   - 확인

2. **새 Static Site 생성**
   - "New +" → "Static Site" 선택
   - 저장소 연결: `kccho88/Subway-location`

3. **설정 입력 (중요!)**
   - **Name**: `subway-location`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build` ⚠️ **반드시 이렇게!**
   - **Publish Directory**: `build`
   - **주의**: Build Command에 `npm install`을 포함해야 합니다!

4. **배포 시작**
   - "Create Static Site" 클릭

---

## 📋 올바른 설정 체크리스트

Render Static Site 설정에서 다음을 확인하세요:

- [ ] **Build Command**: `npm install && npm run build` ⚠️ **가장 중요!**
- [ ] **Publish Directory**: `build`
- [ ] **Branch**: `main` (또는 `master`)
- [ ] **Root Directory**: 비어있음 (또는 `./`)

> ⚠️ **중요**: Render Static Site는 Install Command를 별도로 지원하지 않을 수 있습니다. 
> Build Command에 `npm install && npm run build`를 입력하세요!

---

## 🔍 설정 위치 확인

Render 대시보드에서:
1. 프로젝트 선택
2. **Settings** 탭 클릭
3. **"Build & Deploy"** 섹션 확인
4. 또는 **"Advanced"** 버튼 클릭하여 확장

---

## ⚠️ 주의사항

1. **Install Command는 필수**
   - React 앱을 배포할 때는 반드시 `npm install` 필요
   - 없으면 `react-scripts: not found` 에러 발생

2. **명령어 순서**
   - Render는 다음 순서로 실행:
     1. `npm install` (Install Command)
     2. `npm run build` (Build Command)
     3. `build` 폴더 배포 (Publish Directory)

3. **재배포 필요**
   - 설정 변경 후 반드시 재배포해야 함
   - 자동 재배포 또는 수동 재배포

---

## 🎯 빠른 해결 (요약)

**Render 대시보드 → 프로젝트 → Settings → Build & Deploy**

**Build Command를 다음으로 변경:**

```
npm install && npm run build
```

**그리고 다음 확인:**

1. **Build Command**: `npm install && npm run build` ⚠️ **필수!**
2. **Publish Directory**: `build`

저장 후 재배포하면 해결됩니다!

> 💡 **팁**: Render Static Site는 Install Command 필드가 없을 수 있습니다. 
> Build Command에 `npm install && npm run build`를 입력하면 됩니다!

---

## 📞 추가 도움

여전히 문제가 발생하면:

1. **빌드 로그 확인**
   - Render 대시보드 → 프로젝트 → Logs
   - 에러 메시지 자세히 확인

2. **로컬 테스트**
   ```bash
   npm install
   npm run build
   ```
   - 로컬에서 성공하면 Render 설정 문제

3. **Render 문서 참고**
   - [Render Static Sites 문서](https://render.com/docs/static-sites)

---

## ✅ 완료!

설정을 올바르게 수정하면 빌드가 성공합니다.
문제가 계속되면 빌드 로그를 확인하고 알려주세요!

