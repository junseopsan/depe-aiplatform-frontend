import type { DeliverableCell } from '../types/project-detail.types'

// Legend 기준: 완료 18, 리드 검토 대기 9, AI 처리 중 3, AI 생성 실패 1, 미완료 12
// 총 43개 + blocked/na로 나머지 채움 (12 workstreams × 6 stages = 72)

export const MOCK_DELIVERABLES: DeliverableCell[] = [
  // ── CMN (공통) ──
  { id: 'CMN-BID', workstreamCode: 'CMN', workstreamName: '공통', stageCode: 'BID', stageName: '입찰', documentTitle: '입찰 총괄표', revision: 'REV-02', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'CMN-EST', workstreamCode: 'CMN', workstreamName: '공통', stageCode: 'EST', stageName: '견적', documentTitle: '견적 총괄서', revision: 'REV-01', status: 'ready', origin: 'aiGenerated', statusText: '발행됨', actions: [{ type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'CMN-FEED', workstreamCode: 'CMN', workstreamName: '공통', stageCode: 'FEED', stageName: '기본설계', documentTitle: '기본설계 기준서', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'CMN-DSGN', workstreamCode: 'CMN', workstreamName: '공통', stageCode: 'DSGN', stageName: '상세설계', documentTitle: '상세설계 기준서', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'CMN-VEND', workstreamCode: 'CMN', workstreamName: '공통', stageCode: 'VEND', stageName: 'Vendor 선정', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'CMN-REVW', workstreamCode: 'CMN', workstreamName: '공통', stageCode: 'REVW', stageName: '대조·평가', status: 'na', origin: null, statusText: '', actions: [] },

  // ── PRC (프로세스) ──
  { id: 'PRC-BID', workstreamCode: 'PRC', workstreamName: '프로세스', stageCode: 'BID', stageName: '입찰', documentTitle: 'PFD 초안', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'PRC-EST', workstreamCode: 'PRC', workstreamName: '프로세스', stageCode: 'EST', stageName: '견적', documentTitle: '물량산출서', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'PRC-FEED', workstreamCode: 'PRC', workstreamName: '프로세스', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'P&ID', status: 'generating', origin: 'aiAvailable', statusText: 'AI 처리 중...', actions: [] },
  { id: 'PRC-DSGN', workstreamCode: 'PRC', workstreamName: '프로세스', stageCode: 'DSGN', stageName: '상세설계', documentTitle: 'P&ID 상세', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'PRC-VEND', workstreamCode: 'PRC', workstreamName: '프로세스', stageCode: 'VEND', stageName: 'Vendor 선정', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'PRC-REVW', workstreamCode: 'PRC', workstreamName: '프로세스', stageCode: 'REVW', stageName: '대조·평가', status: 'na', origin: null, statusText: '', actions: [] },

  // ── MEQ (주기기) ──
  { id: 'MEQ-BID', workstreamCode: 'MEQ', workstreamName: '주기기', stageCode: 'BID', stageName: '입찰', documentTitle: '기기 사양서', revision: 'REV-01', status: 'ready', origin: 'aiGenerated', statusText: '발행됨', actions: [{ type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'MEQ-EST', workstreamCode: 'MEQ', workstreamName: '주기기', stageCode: 'EST', stageName: '견적', documentTitle: '기기 견적서', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'MEQ-FEED', workstreamCode: 'MEQ', workstreamName: '주기기', stageCode: 'FEED', stageName: '기본설계', documentTitle: '기기 Data Sheet', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'MEQ-DSGN', workstreamCode: 'MEQ', workstreamName: '주기기', stageCode: 'DSGN', stageName: '상세설계', documentTitle: '기기 상세 사양', status: 'missing', origin: 'manualRequired', statusText: '', actions: [{ type: 'upload', variant: 'primary', label: '업로드' }] },
  { id: 'MEQ-VEND', workstreamCode: 'MEQ', workstreamName: '주기기', stageCode: 'VEND', stageName: 'Vendor 선정', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'MEQ-REVW', workstreamCode: 'MEQ', workstreamName: '주기기', stageCode: 'REVW', stageName: '대조·평가', status: 'na', origin: null, statusText: '', actions: [] },

  // ── ELE (전기) ──
  { id: 'ELE-BID', workstreamCode: 'ELE', workstreamName: '전기', stageCode: 'BID', stageName: '입찰', documentTitle: '전기 단선도', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'ELE-EST', workstreamCode: 'ELE', workstreamName: '전기', stageCode: 'EST', stageName: '견적', documentTitle: '전기 물량서', revision: 'REV-01', status: 'ready', origin: 'aiGenerated', statusText: '발행됨', actions: [{ type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'ELE-FEED', workstreamCode: 'ELE', workstreamName: '전기', stageCode: 'FEED', stageName: '기본설계', documentTitle: '전기 기본설계서', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'ELE-DSGN', workstreamCode: 'ELE', workstreamName: '전기', stageCode: 'DSGN', stageName: '상세설계', documentTitle: '전기 상세도면', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'ELE-VEND', workstreamCode: 'ELE', workstreamName: '전기', stageCode: 'VEND', stageName: 'Vendor 선정', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'ELE-REVW', workstreamCode: 'ELE', workstreamName: '전기', stageCode: 'REVW', stageName: '대조·평가', status: 'na', origin: null, statusText: '', actions: [] },

  // ── INS (계장) ──
  { id: 'INS-BID', workstreamCode: 'INS', workstreamName: '계장', stageCode: 'BID', stageName: '입찰', documentTitle: '계장 사양서', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'INS-EST', workstreamCode: 'INS', workstreamName: '계장', stageCode: 'EST', stageName: '견적', documentTitle: '계장 견적서', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'INS-FEED', workstreamCode: 'INS', workstreamName: '계장', stageCode: 'FEED', stageName: '기본설계', documentTitle: '계장 기본설계', status: 'generating', origin: 'aiAvailable', statusText: 'AI 처리 중...', actions: [] },
  { id: 'INS-DSGN', workstreamCode: 'INS', workstreamName: '계장', stageCode: 'DSGN', stageName: '상세설계', documentTitle: '계장 상세도', status: 'missing', origin: 'manualRequired', statusText: '', actions: [{ type: 'upload', variant: 'primary', label: '업로드' }] },
  { id: 'INS-VEND', workstreamCode: 'INS', workstreamName: '계장', stageCode: 'VEND', stageName: 'Vendor 선정', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'INS-REVW', workstreamCode: 'INS', workstreamName: '계장', stageCode: 'REVW', stageName: '대조·평가', status: 'na', origin: null, statusText: '', actions: [] },

  // ── MEC (기계) ──
  { id: 'MEC-BID', workstreamCode: 'MEC', workstreamName: '기계', stageCode: 'BID', stageName: '입찰', documentTitle: '기계 배치도', revision: 'REV-02', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'MEC-EST', workstreamCode: 'MEC', workstreamName: '기계', stageCode: 'EST', stageName: '견적', documentTitle: '기계 견적서', revision: 'REV-01', status: 'ready', origin: 'aiGenerated', statusText: '발행됨', actions: [{ type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'MEC-FEED', workstreamCode: 'MEC', workstreamName: '기계', stageCode: 'FEED', stageName: '기본설계', documentTitle: '기계 기본설계', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'MEC-DSGN', workstreamCode: 'MEC', workstreamName: '기계', stageCode: 'DSGN', stageName: '상세설계', documentTitle: '기계 상세설계', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'MEC-VEND', workstreamCode: 'MEC', workstreamName: '기계', stageCode: 'VEND', stageName: 'Vendor 선정', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'MEC-REVW', workstreamCode: 'MEC', workstreamName: '기계', stageCode: 'REVW', stageName: '대조·평가', status: 'na', origin: null, statusText: '', actions: [] },

  // ── WTR (수처리) ──
  { id: 'WTR-BID', workstreamCode: 'WTR', workstreamName: '수처리', stageCode: 'BID', stageName: '입찰', documentTitle: '수처리 계통도', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'WTR-EST', workstreamCode: 'WTR', workstreamName: '수처리', stageCode: 'EST', stageName: '견적', documentTitle: '수처리 견적서', revision: 'REV-01', status: 'ready', origin: 'aiGenerated', statusText: '발행됨', actions: [{ type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'WTR-FEED', workstreamCode: 'WTR', workstreamName: '수처리', stageCode: 'FEED', stageName: '기본설계', documentTitle: '수처리 기본설계', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'WTR-DSGN', workstreamCode: 'WTR', workstreamName: '수처리', stageCode: 'DSGN', stageName: '상세설계', documentTitle: '수처리 상세설계', status: 'missing', origin: 'manualRequired', statusText: '', actions: [{ type: 'upload', variant: 'primary', label: '업로드' }] },
  { id: 'WTR-VEND', workstreamCode: 'WTR', workstreamName: '수처리', stageCode: 'VEND', stageName: 'Vendor 선정', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'WTR-REVW', workstreamCode: 'WTR', workstreamName: '수처리', stageCode: 'REVW', stageName: '대조·평가', status: 'na', origin: null, statusText: '', actions: [] },

  // ── CIV (토목) ──
  { id: 'CIV-BID', workstreamCode: 'CIV', workstreamName: '토목', stageCode: 'BID', stageName: '입찰', documentTitle: '토목 배치도', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'CIV-EST', workstreamCode: 'CIV', workstreamName: '토목', stageCode: 'EST', stageName: '견적', documentTitle: '토목 물량서', revision: 'REV-01', status: 'ready', origin: 'aiGenerated', statusText: '발행됨', actions: [{ type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'CIV-FEED', workstreamCode: 'CIV', workstreamName: '토목', stageCode: 'FEED', stageName: '기본설계', documentTitle: '토목 기본설계', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'CIV-DSGN', workstreamCode: 'CIV', workstreamName: '토목', stageCode: 'DSGN', stageName: '상세설계', documentTitle: '토목 상세도면', status: 'aiFailed', origin: 'aiFailed', statusText: 'AI 생성 실패', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }, { type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'CIV-VEND', workstreamCode: 'CIV', workstreamName: '토목', stageCode: 'VEND', stageName: 'Vendor 선정', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'CIV-REVW', workstreamCode: 'CIV', workstreamName: '토목', stageCode: 'REVW', stageName: '대조·평가', status: 'na', origin: null, statusText: '', actions: [] },

  // ── ARC (건축) ──
  { id: 'ARC-BID', workstreamCode: 'ARC', workstreamName: '건축', stageCode: 'BID', stageName: '입찰', documentTitle: '건축 평면도', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'ARC-EST', workstreamCode: 'ARC', workstreamName: '건축', stageCode: 'EST', stageName: '견적', documentTitle: '건축 견적서', revision: 'REV-01', status: 'ready', origin: 'aiGenerated', statusText: '발행됨', actions: [{ type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'ARC-FEED', workstreamCode: 'ARC', workstreamName: '건축', stageCode: 'FEED', stageName: '기본설계', documentTitle: '건축 기본설계', status: 'generating', origin: 'aiAvailable', statusText: 'AI 처리 중...', actions: [] },
  { id: 'ARC-DSGN', workstreamCode: 'ARC', workstreamName: '건축', stageCode: 'DSGN', stageName: '상세설계', documentTitle: '건축 상세도면', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'ARC-VEND', workstreamCode: 'ARC', workstreamName: '건축', stageCode: 'VEND', stageName: 'Vendor 선정', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'ARC-REVW', workstreamCode: 'ARC', workstreamName: '건축', stageCode: 'REVW', stageName: '대조·평가', status: 'na', origin: null, statusText: '', actions: [] },

  // ── PIP (배관) ──
  { id: 'PIP-BID', workstreamCode: 'PIP', workstreamName: '배관', stageCode: 'BID', stageName: '입찰', documentTitle: '배관 계통도', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'PIP-EST', workstreamCode: 'PIP', workstreamName: '배관', stageCode: 'EST', stageName: '견적', documentTitle: '배관 물량서', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'PIP-FEED', workstreamCode: 'PIP', workstreamName: '배관', stageCode: 'FEED', stageName: '기본설계', documentTitle: '배관 기본설계', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'PIP-DSGN', workstreamCode: 'PIP', workstreamName: '배관', stageCode: 'DSGN', stageName: '상세설계', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'PIP-VEND', workstreamCode: 'PIP', workstreamName: '배관', stageCode: 'VEND', stageName: 'Vendor 선정', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'PIP-REVW', workstreamCode: 'PIP', workstreamName: '배관', stageCode: 'REVW', stageName: '대조·평가', status: 'na', origin: null, statusText: '', actions: [] },

  // ── LAY (공간) ──
  { id: 'LAY-BID', workstreamCode: 'LAY', workstreamName: '공간', stageCode: 'BID', stageName: '입찰', documentTitle: 'Plot Plan', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'LAY-EST', workstreamCode: 'LAY', workstreamName: '공간', stageCode: 'EST', stageName: '견적', documentTitle: '공간 견적서', status: 'missing', origin: 'manualRequired', statusText: '', actions: [{ type: 'upload', variant: 'primary', label: '업로드' }] },
  { id: 'LAY-FEED', workstreamCode: 'LAY', workstreamName: '공간', stageCode: 'FEED', stageName: '기본설계', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'LAY-DSGN', workstreamCode: 'LAY', workstreamName: '공간', stageCode: 'DSGN', stageName: '상세설계', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'LAY-VEND', workstreamCode: 'LAY', workstreamName: '공간', stageCode: 'VEND', stageName: 'Vendor 선정', status: 'na', origin: null, statusText: '', actions: [] },
  { id: 'LAY-REVW', workstreamCode: 'LAY', workstreamName: '공간', stageCode: 'REVW', stageName: '대조·평가', status: 'na', origin: null, statusText: '', actions: [] },

  // ── UTL (설비) ──
  { id: 'UTL-BID', workstreamCode: 'UTL', workstreamName: '설비', stageCode: 'BID', stageName: '입찰', documentTitle: '유틸리티 계통도', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'UTL-EST', workstreamCode: 'UTL', workstreamName: '설비', stageCode: 'EST', stageName: '견적', documentTitle: '설비 견적서', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'UTL-FEED', workstreamCode: 'UTL', workstreamName: '설비', stageCode: 'FEED', stageName: '기본설계', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'UTL-DSGN', workstreamCode: 'UTL', workstreamName: '설비', stageCode: 'DSGN', stageName: '상세설계', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'UTL-VEND', workstreamCode: 'UTL', workstreamName: '설비', stageCode: 'VEND', stageName: 'Vendor 선정', status: 'na', origin: null, statusText: '', actions: [] },
  { id: 'UTL-REVW', workstreamCode: 'UTL', workstreamName: '설비', stageCode: 'REVW', stageName: '대조·평가', status: 'na', origin: null, statusText: '', actions: [] },
]
