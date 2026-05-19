/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import type { NextConfig } from "next";

const API_TARGET = process.env.NEXT_PUBLIC_API_PROXY_TARGET ?? "http://localhost:8888";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "standalone",
  /**
   * Dev 환경에서 백엔드 CORS를 피하려고 Next.js 를 프록시로 사용.
   * 프론트는 같은 origin 의 `/api/*` 로 호출하고, Next 가 백엔드(NEXT_PUBLIC_API_PROXY_TARGET)로
   * 서버 사이드 포워딩한다. 운영에서는 백엔드 도메인이 다르면 CORS 설정 또는 동일 호스트 배포 필요.
   */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_TARGET}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
