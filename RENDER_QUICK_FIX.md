# Render 빌드 에러 빠른 수정 가이드

## 🚨 문제: Status 127 에러 (react-scripts: not found)

## ✅ 해결 방법 (30초 안에!)

### Render 대시보드에서:

1. **프로젝트 선택** → **Settings** 탭 클릭

2. **Build Command 찾기**
   - "Build & Deploy" 섹션에서 "Build Command" 필드 찾기

3. **Build Command 변경**
   - 기존: `npm run build` ❌
   - 변경: `npm install && npm run build` ✅

4. **저장**
   - "Save Changes" 클릭

5. **재배포**
   - 자동 재배포 또는 "Manual Deploy" 클릭

---

## 📝 정확한 설정 값

| 항목 | 값 |
|------|-----|
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |
| **Branch** | `main` |

---

## ⚠️ 왜 이렇게 해야 하나요?

Render Static Site는 **Install Command를 별도로 지원하지 않습니다**.
따라서 Build Command에 `npm install`을 포함해야 합니다.

`&&`는 "그리고"를 의미하며, 첫 번째 명령어가 성공하면 두 번째 명령어를 실행합니다.

---

## ✅ 완료!

이제 빌드가 성공할 것입니다!

