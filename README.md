# poi82999.github.io

개인 포트폴리오 사이트. `poi82999` GitHub 계정의 public 저장소 활동을 매일 자동으로 반영한다.

## 동작 방식

- `scripts/generate.mjs`: GitHub REST API로 public repo 목록 + 각 저장소의 최신 커밋을 조회해
  `data/projects.json`을 재생성한다.
- `.github/workflows/update-portfolio.yml`: 매일 00:00 UTC(KST 09:00)에 위 스크립트를 실행하고,
  변경이 있으면 자동 커밋/푸시한다. `Actions` 탭에서 `Run workflow`로 즉시 실행도 가능하다.
- `index.html`: 정적 페이지. `data/projects.json`을 fetch해서 카드 형태로 렌더링한다. 빌드 단계 없음.

## 새 프로젝트를 포트폴리오에 반영하려면

`dev\` 아래 프로젝트를 **public** GitHub 저장소로 push하면 다음 스케줄 실행 시 자동으로 나타난다.
수동으로 즉시 반영하고 싶으면 이 저장소의 Actions 탭에서 `Update portfolio` 워크플로를 수동 실행(workflow_dispatch).

## 로컬에서 미리보기

```powershell
node scripts/generate.mjs   # data/projects.json 갱신 (GITHUB_TOKEN 환경변수 있으면 rate limit 여유)
# 이후 index.html을 브라우저로 열거나 로컬 정적 서버로 서빙
```
