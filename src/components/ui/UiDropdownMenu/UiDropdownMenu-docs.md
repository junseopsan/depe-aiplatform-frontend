# UiDropdownMenu

`@base-ui/react/menu` 위에 디자인 시스템 토큰을 적용한 드롭다운 메뉴 프리미티브.

## 구성

| 컴포넌트 | 역할 |
|---|---|
| `DropdownMenu` | 루트. `open`, `defaultOpen`, `onOpenChange` 등 base-ui Root props |
| `DropdownMenuTrigger` | 트리거. `render`로 다른 컴포넌트(UiButton 등)에 위임 가능 |
| `DropdownMenuContent` | 팝업 컨테이너 (Portal + Positioner + Popup 묶음) |
| `DropdownMenuItem` | 메뉴 항목. `onClick` 또는 `onSelect` 사용 |
| `DropdownMenuSeparator` | 항목 구분선 |

## Content Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `sideOffset` | `number` | `4` | 트리거와 팝업 간 거리(px) |
| `align` | `"start" \| "center" \| "end"` | `"start"` | 정렬 |
| `className` | `string` | — | 팝업 추가 클래스 |

## 사용 예시

```tsx
import { Button } from "@/components/ui/UiButton"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/UiDropdownMenu"

<DropdownMenu>
  <DropdownMenuTrigger render={<Button>업로드</Button>} />
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => pickFiles()}>파일 선택</DropdownMenuItem>
    <DropdownMenuItem onClick={() => pickFolder()}>폴더 선택</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## 스타일

- 팝업: 흰 배경, `--gray-200` border, 둥근 모서리(rounded-md), shadow-lg
- 항목 hover/focus: `--primary-50` 배경 + `--primary-700` 텍스트
- 진입/이탈: 150ms scale + opacity fade (`data-starting-style` / `data-ending-style`)

## 의존성

- `@base-ui/react/menu` — accessibility · 키보드 네비게이션 · 포커스 트랩 처리
