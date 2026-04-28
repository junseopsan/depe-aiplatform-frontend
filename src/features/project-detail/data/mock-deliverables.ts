import type { DeliverableCell } from '../types/project-detail.types'

export const MOCK_DELIVERABLES: DeliverableCell[] = [
  // ── CMN (공통) — BID/REVW 제외 후에도 데이터는 유지 (필터로 제외) ──
  { id: 'CMN-BID', workstreamCode: 'CMN', workstreamName: '공통', stageCode: 'BID', stageName: '입찰', documentTitle: 'ITB', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'CMN-EST', workstreamCode: 'CMN', workstreamName: '공통', stageCode: 'EST', stageName: '견적', documentTitle: 'IRS', revision: 'REV-01', status: 'ready', origin: 'aiGenerated', statusText: '발행됨', actions: [{ type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'CMN-FEED', workstreamCode: 'CMN', workstreamName: '공통', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'MPS', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'CMN-DSGN', workstreamCode: 'CMN', workstreamName: '공통', stageCode: 'DSGN', stageName: '상세설계', documentTitle: 'Design Criteria', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'CMN-VEND', workstreamCode: 'CMN', workstreamName: '공통', stageCode: 'VEND', stageName: 'Vendor 선정', documentTitle: 'Vendor A', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'CMN-REVW', workstreamCode: 'CMN', workstreamName: '공통', stageCode: 'REVW', stageName: '대조·평가', documentTitle: 'Technical Evaluation', status: 'blocked', origin: null, statusText: '', actions: [] },

  // ── PRC (프로세스) ──
  { id: 'PRC-BID', workstreamCode: 'PRC', workstreamName: '프로세스', stageCode: 'BID', stageName: '입찰', documentTitle: 'PFD 초안', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'PRC-EST', workstreamCode: 'PRC', workstreamName: '프로세스', stageCode: 'EST', stageName: '견적', documentTitle: 'IRS', status: 'missing', origin: 'manualRequired', statusText: '', actions: [{ type: 'upload', variant: 'primary', label: '업로드' }] },
  { id: 'PRC-FEED', workstreamCode: 'PRC', workstreamName: '프로세스', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'MPS', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'PRC-DSGN', workstreamCode: 'PRC', workstreamName: '프로세스', stageCode: 'DSGN', stageName: '상세설계', documentTitle: 'Design Criteria', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'PRC-VEND', workstreamCode: 'PRC', workstreamName: '프로세스', stageCode: 'VEND', stageName: 'Vendor 선정', documentTitle: 'Vendor A', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'PRC-REVW', workstreamCode: 'PRC', workstreamName: '프로세스', stageCode: 'REVW', stageName: '대조·평가', documentTitle: 'Technical Evaluation', status: 'blocked', origin: null, statusText: '', actions: [] },

  // ── MEQ (주기기) ──
  { id: 'MEQ-BID', workstreamCode: 'MEQ', workstreamName: '주기기', stageCode: 'BID', stageName: '입찰', documentTitle: 'ITB', revision: 'REV-01', status: 'ready', origin: 'aiGenerated', statusText: '발행됨', actions: [{ type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'MEQ-EST', workstreamCode: 'MEQ', workstreamName: '주기기', stageCode: 'EST', stageName: '견적', documentTitle: 'IRS', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'MEQ-FEED', workstreamCode: 'MEQ', workstreamName: '주기기', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'MPS', status: 'generating', origin: 'aiAvailable', statusText: 'AI 처리 중...', actions: [] },
  { id: 'MEQ-DSGN', workstreamCode: 'MEQ', workstreamName: '주기기', stageCode: 'DSGN', stageName: '상세설계', documentTitle: 'Design Criteria', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'MEQ-VEND', workstreamCode: 'MEQ', workstreamName: '주기기', stageCode: 'VEND', stageName: 'Vendor 선정', documentTitle: 'Vendor B', revision: 'REV-01', status: 'ready', origin: 'aiGenerated', statusText: '발행됨', actions: [{ type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'MEQ-REVW', workstreamCode: 'MEQ', workstreamName: '주기기', stageCode: 'REVW', stageName: '대조·평가', documentTitle: 'Technical Evaluation', status: 'blocked', origin: null, statusText: '', actions: [] },

  // ── ELE (전기) ──
  { id: 'ELE-BID', workstreamCode: 'ELE', workstreamName: '전기', stageCode: 'BID', stageName: '입찰', documentTitle: 'ITB', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'ELE-EST', workstreamCode: 'ELE', workstreamName: '전기', stageCode: 'EST', stageName: '견적', documentTitle: 'IRS', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'ELE-FEED', workstreamCode: 'ELE', workstreamName: '전기', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'MPS', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'ELE-DSGN', workstreamCode: 'ELE', workstreamName: '전기', stageCode: 'DSGN', stageName: '상세설계', documentTitle: 'Design Criteria', status: 'generating', origin: 'aiAvailable', statusText: 'AI 처리 중...', actions: [] },
  { id: 'ELE-VEND', workstreamCode: 'ELE', workstreamName: '전기', stageCode: 'VEND', stageName: 'Vendor 선정', documentTitle: 'Vendor C', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'ELE-REVW', workstreamCode: 'ELE', workstreamName: '전기', stageCode: 'REVW', stageName: '대조·평가', documentTitle: 'Technical Evaluation', status: 'generating', origin: 'aiAvailable', statusText: 'AI 처리 중...', actions: [] },

  // ── INS (계장) ──
  { id: 'INS-BID', workstreamCode: 'INS', workstreamName: '계장', stageCode: 'BID', stageName: '입찰', documentTitle: 'ITB', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'INS-EST', workstreamCode: 'INS', workstreamName: '계장', stageCode: 'EST', stageName: '견적', documentTitle: 'IRS', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'INS-FEED', workstreamCode: 'INS', workstreamName: '계장', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'MPS', status: 'aiFailed', origin: 'aiFailed', statusText: 'AI 생성 실패', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }, { type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'INS-DSGN', workstreamCode: 'INS', workstreamName: '계장', stageCode: 'DSGN', stageName: '상세설계', documentTitle: 'Design Criteria', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'INS-VEND', workstreamCode: 'INS', workstreamName: '계장', stageCode: 'VEND', stageName: 'Vendor 선정', documentTitle: 'Vendor A', revision: 'REV-01', status: 'ready', origin: 'aiGenerated', statusText: '발행됨', actions: [{ type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'INS-REVW', workstreamCode: 'INS', workstreamName: '계장', stageCode: 'REVW', stageName: '대조·평가', documentTitle: 'Technical Evaluation', status: 'blocked', origin: null, statusText: '', actions: [] },

  // ── MEC (기계) ──
  { id: 'MEC-BID', workstreamCode: 'MEC', workstreamName: '기계', stageCode: 'BID', stageName: '입찰', documentTitle: 'ITB', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'MEC-EST', workstreamCode: 'MEC', workstreamName: '기계', stageCode: 'EST', stageName: '견적', documentTitle: 'IRS', revision: 'REV-01', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'MEC-FEED', workstreamCode: 'MEC', workstreamName: '기계', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'MPS', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'MEC-DSGN', workstreamCode: 'MEC', workstreamName: '기계', stageCode: 'DSGN', stageName: '상세설계', documentTitle: 'Design Criteria', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'MEC-VEND', workstreamCode: 'MEC', workstreamName: '기계', stageCode: 'VEND', stageName: 'Vendor 선정', documentTitle: 'Vendor A', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'MEC-REVW', workstreamCode: 'MEC', workstreamName: '기계', stageCode: 'REVW', stageName: '대조·평가', documentTitle: 'Technical Evaluation', status: 'blocked', origin: null, statusText: '', actions: [] },

  // ── WTR (수처리) ──
  { id: 'WTR-BID', workstreamCode: 'WTR', workstreamName: '수처리', stageCode: 'BID', stageName: '입찰', documentTitle: 'ITB', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'WTR-EST', workstreamCode: 'WTR', workstreamName: '수처리', stageCode: 'EST', stageName: '견적', documentTitle: 'IRS', status: 'generating', origin: 'aiAvailable', statusText: 'AI 처리 중...', actions: [] },
  { id: 'WTR-FEED', workstreamCode: 'WTR', workstreamName: '수처리', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'MPS', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'WTR-DSGN', workstreamCode: 'WTR', workstreamName: '수처리', stageCode: 'DSGN', stageName: '상세설계', documentTitle: 'Design Criteria', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'WTR-VEND', workstreamCode: 'WTR', workstreamName: '수처리', stageCode: 'VEND', stageName: 'Vendor 선정', documentTitle: 'Vendor A', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'WTR-REVW', workstreamCode: 'WTR', workstreamName: '수처리', stageCode: 'REVW', stageName: '대조·평가', documentTitle: 'Technical Evaluation', status: 'blocked', origin: null, statusText: '', actions: [] },

  // ── CIV (토목) ──
  { id: 'CIV-BID', workstreamCode: 'CIV', workstreamName: '토목', stageCode: 'BID', stageName: '입찰', documentTitle: 'ITB', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'CIV-EST', workstreamCode: 'CIV', workstreamName: '토목', stageCode: 'EST', stageName: '견적', documentTitle: 'IRS', revision: 'REV-02', status: 'ready', origin: 'aiGenerated', statusText: '발행됨', actions: [] },
  { id: 'CIV-FEED', workstreamCode: 'CIV', workstreamName: '토목', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'MPS', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'CIV-DSGN', workstreamCode: 'CIV', workstreamName: '토목', stageCode: 'DSGN', stageName: '상세설계', status: 'na', origin: null, statusText: '', actions: [] },
  { id: 'CIV-VEND', workstreamCode: 'CIV', workstreamName: '토목', stageCode: 'VEND', stageName: 'Vendor 선정', documentTitle: 'Vendor A', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'CIV-REVW', workstreamCode: 'CIV', workstreamName: '토목', stageCode: 'REVW', stageName: '대조·평가', documentTitle: 'Technical Evaluation', status: 'blocked', origin: null, statusText: '', actions: [] },

  // ── ARC (건축) ──
  { id: 'ARC-BID', workstreamCode: 'ARC', workstreamName: '건축', stageCode: 'BID', stageName: '입찰', documentTitle: 'ITB', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'ARC-EST', workstreamCode: 'ARC', workstreamName: '건축', stageCode: 'EST', stageName: '견적', documentTitle: 'IRS', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'ARC-FEED', workstreamCode: 'ARC', workstreamName: '건축', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'MPS', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'ARC-DSGN', workstreamCode: 'ARC', workstreamName: '건축', stageCode: 'DSGN', stageName: '상세설계', status: 'na', origin: null, statusText: '', actions: [] },
  { id: 'ARC-VEND', workstreamCode: 'ARC', workstreamName: '건축', stageCode: 'VEND', stageName: 'Vendor 선정', documentTitle: 'Vendor A', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'ARC-REVW', workstreamCode: 'ARC', workstreamName: '건축', stageCode: 'REVW', stageName: '대조·평가', documentTitle: 'Technical Evaluation', status: 'blocked', origin: null, statusText: '', actions: [] },

  // ── PIP (배관) ──
  { id: 'PIP-BID', workstreamCode: 'PIP', workstreamName: '배관', stageCode: 'BID', stageName: '입찰', documentTitle: 'ITB', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'PIP-EST', workstreamCode: 'PIP', workstreamName: '배관', stageCode: 'EST', stageName: '견적', documentTitle: 'IRS', revision: 'REV-02', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'PIP-FEED', workstreamCode: 'PIP', workstreamName: '배관', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'MPS', status: 'generating', origin: 'aiAvailable', statusText: 'AI 처리 중...', actions: [] },
  { id: 'PIP-DSGN', workstreamCode: 'PIP', workstreamName: '배관', stageCode: 'DSGN', stageName: '상세설계', documentTitle: 'Design Criteria', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'PIP-VEND', workstreamCode: 'PIP', workstreamName: '배관', stageCode: 'VEND', stageName: 'Vendor 선정', documentTitle: 'Vendor A', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'PIP-REVW', workstreamCode: 'PIP', workstreamName: '배관', stageCode: 'REVW', stageName: '대조·평가', documentTitle: 'Technical Evaluation', status: 'blocked', origin: null, statusText: '', actions: [] },

  // ── LAY (공간) ──
  { id: 'LAY-BID', workstreamCode: 'LAY', workstreamName: '공간', stageCode: 'BID', stageName: '입찰', documentTitle: 'ITB', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'LAY-EST', workstreamCode: 'LAY', workstreamName: '공간', stageCode: 'EST', stageName: '견적', documentTitle: 'IRS', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'LAY-FEED', workstreamCode: 'LAY', workstreamName: '공간', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'MPS', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'LAY-DSGN', workstreamCode: 'LAY', workstreamName: '공간', stageCode: 'DSGN', stageName: '상세설계', status: 'na', origin: null, statusText: '', actions: [] },
  { id: 'LAY-VEND', workstreamCode: 'LAY', workstreamName: '공간', stageCode: 'VEND', stageName: 'Vendor 선정', documentTitle: 'Vendor A', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'LAY-REVW', workstreamCode: 'LAY', workstreamName: '공간', stageCode: 'REVW', stageName: '대조·평가', documentTitle: 'Technical Evaluation', status: 'blocked', origin: null, statusText: '', actions: [] },

  // ── UTL (설비) ──
  { id: 'UTL-BID', workstreamCode: 'UTL', workstreamName: '설비', stageCode: 'BID', stageName: '입찰', documentTitle: 'ITB', revision: 'REV-01', status: 'ready', origin: 'manualUploaded', statusText: '발행됨', actions: [{ type: 'upload', variant: 'secondary', label: '업로드' }] },
  { id: 'UTL-EST', workstreamCode: 'UTL', workstreamName: '설비', stageCode: 'EST', stageName: '견적', documentTitle: 'IRS', status: 'review', origin: 'aiGenerated', statusText: '리드 검토 대기', actions: [{ type: 'publish', variant: 'primary', label: '발행' }, { type: 'aiGenerate', variant: 'secondary', label: 'AI 생성' }] },
  { id: 'UTL-FEED', workstreamCode: 'UTL', workstreamName: '설비', stageCode: 'FEED', stageName: '기본설계', documentTitle: 'IRS', status: 'missing', origin: 'aiAvailable', statusText: '', actions: [{ type: 'aiGenerate', variant: 'primary', label: 'AI 생성' }] },
  { id: 'UTL-DSGN', workstreamCode: 'UTL', workstreamName: '설비', stageCode: 'DSGN', stageName: '상세설계', documentTitle: 'Design Criteria', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'UTL-VEND', workstreamCode: 'UTL', workstreamName: '설비', stageCode: 'VEND', stageName: 'Vendor 선정', documentTitle: 'Design Criteria', status: 'blocked', origin: null, statusText: '', actions: [] },
  { id: 'UTL-REVW', workstreamCode: 'UTL', workstreamName: '설비', stageCode: 'REVW', stageName: '대조·평가', documentTitle: 'Technical Evaluation', status: 'blocked', origin: null, statusText: '', actions: [] },
]
