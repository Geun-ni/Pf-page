# Geuni — CVC 포트폴리오

> **Collect. Verify. Correct.**
> I collect data, verify it against the source, and correct what doesn't match.

크리스마스 픽셀 테마로 만든 이정근(Geuni)의 백엔드·데이터 포트폴리오입니다.

### 👉 [사이트 바로 가기](https://geun-ni.github.io/Pf-page/)

https://geun-ni.github.io/Pf-page/

---

## 페이지 구성

| 섹션 | 내용 |
|---|---|
| **CVC** | 한 줄 소개와 관심 분야 (백엔드 · 데이터 · DB · 클라우드) |
| **Troubleshooting** | 프로젝트에서 마주친 문제와 해결 과정. 카드의 "자세히 보기"를 누르면 상세 내용이 열립니다. |
| **Works** | 참여한 프로젝트와 맡은 역할, GitHub 링크 |
| **Main Prompt** | AI 코딩 도구와 일할 때 쓰는 규칙 5가지. `COPY` 버튼으로 바로 복사할 수 있습니다. |
| **Others** | 대외활동과 수업 프로젝트 |

---

## ♪ BGM 듣는 방법

1. 화면 오른쪽 위, 다크 모드 스위치 옆의 **`♪ BGM ↗`** 버튼을 누릅니다.
2. 새 탭에서 Suno 곡 페이지가 열립니다. 그곳에서 재생 버튼을 누르면 됩니다.
3. 곡을 틀어 둔 채 원래 탭으로 돌아와 사이트를 둘러보세요.

> 음악은 Suno로 만들었습니다. 사이트 안에서 자동으로 재생되지는 않습니다.

---

## 🎁 숨겨진 요소

첫 화면 아래쪽, 눈 덮인 언덕을 걷는 고양이를 찾아보세요.

### 🐈 고양이 점프
- 처음 들어오면 고양이 위에 **`JUMP!`** 말풍선이 깜빡입니다.
- 고양이를 **클릭하거나 탭**하면 머리 위에 **`!`** 가 뜨고 깡충 뜁니다. 발밑에서는 눈가루가 튑니다.
- 키보드로도 할 수 있습니다. `Tab`으로 고양이를 선택하고 `Enter`를 누르세요.

### 🎁 선물 상자
- 트리 옆 선물 상자를 누르면 뚜껑이 열리고 메시지가 나옵니다.
  - 빨간 상자: `Merry Christmas!`
  - 초록 상자: `Thanks for visiting!`
- 고양이가 **선물 상자 바로 옆에서 점프**해도 가까운 상자가 열립니다. 고양이가 오른쪽 끝까지 걸어왔을 때 눌러 보세요.

### 그 밖에
- **🌙 다크 모드:** 오른쪽 위 스위치로 바꿀 수 있습니다. 라이트 모드는 구름 낀 겨울 아침, 다크 모드는 별이 뜬 밤입니다. 고른 모드는 다음 방문 때도 유지됩니다.
- **🎄 트리와 전구:** 트리 장식과 헤더 아래 전구 줄이 깜빡입니다.
- **▲ TOP:** 아래로 스크롤하면 오른쪽 아래에 맨 위로 가는 버튼이 나타납니다.

> 기기에서 "동작 줄이기"를 켜 두었다면 점프와 깜빡임이 줄어들고 `!`만 표시됩니다.

---

## 만든 방법

- **구성:** HTML · CSS · JavaScript만 사용한 정적 사이트이며, GitHub Pages로 배포합니다.
- **픽셀 그림:** 고양이, 트리, 선물 상자, 언덕, 구름은 이미지 파일 없이 코드로 직접 그렸습니다.
- **글꼴:** [Galmuri](https://github.com/quiple/galmuri)(픽셀 글꼴), [Pretendard](https://github.com/orioncactus/pretendard). 둘 다 SIL Open Font License입니다.
- **제작 도구:** Claude Code, Codex
- **음악:** Suno

```
Pf-page/
├── index.html   # 페이지 구조와 내용
├── style.css    # 테마 색상, 픽셀 스타일, 모바일 대응
├── theme.js     # 다크 모드, 복사 버튼, 고양이·선물 상자, 눈·전구 효과
└── robots.txt   # AI 학습용 크롤러 수집 거부
```

---

© Geuni · [GitHub](https://github.com/Geun-ni)
