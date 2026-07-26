# poi82999.github.io — 에이전트 노트

- 빌드체인 없는 순수 정적 사이트. `index.html`이 `data/projects.json`을 fetch해서 렌더링한다.
- `data/projects.json`은 사람이 직접 편집하지 않는다 — `scripts/generate.mjs` (또는 Actions 워크플로)가 생성하는 파일이다.
- 디자인/카피 수정은 `index.html`, `style.css`만 건드리면 된다.
- 새 public 저장소를 추가/이름 변경했을 때 즉시 반영하려면: `node scripts/generate.mjs` 로컬 실행 후 커밋, 또는 GitHub Actions 탭에서 워크플로 수동 실행.
