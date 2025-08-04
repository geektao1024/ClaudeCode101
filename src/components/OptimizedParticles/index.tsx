'use client'

import { useTheme } from 'nextra-theme-docs'
import { cn } from '@/lib/utils'

/**
 * 高性能 CSS 粒子动画组件
 * 使用纯 CSS 动画替代 JavaScript 计算，大幅提升性能
 */
export function OptimizedParticles() {
  const { resolvedTheme } = useTheme()

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 背景渐变 */}
      <div 
        className={cn(
          "absolute inset-0 opacity-30",
          resolvedTheme === 'light' 
            ? "bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" 
            : "bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20"
        )}
      />
      
      {/* CSS 粒子动画 */}
      <div className="particles-container">
        {/* 生成 20 个粒子元素，比原来的 60 个大幅减少 */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "particle",
              resolvedTheme === 'light' ? "particle-light" : "particle-dark"
            )}
            style={{
              '--delay': `${i * 0.5}s`,
              '--duration': `${8 + (i % 4) * 2}s`,
              '--x-start': `${(i * 47) % 100}vw`,
              '--y-start': `${(i * 31) % 100}vh`,
            } as React.CSSProperties}
          />
        ))}
        
        {/* 连接线效果 - 使用伪元素实现 */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`line-${i}`}
            className={cn(
              "particle-line",
              resolvedTheme === 'light' ? "line-light" : "line-dark"
            )}
            style={{
              '--delay': `${i * 1.2}s`,
              '--duration': `${12 + (i % 3) * 2}s`,
              '--start-x': `${(i * 23) % 80}%`,
              '--start-y': `${(i * 37) % 80}%`,
              '--end-x': `${((i + 1) * 29) % 80}%`,
              '--end-y': `${((i + 1) * 41) % 80}%`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <style jsx>{`
        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          animation: float var(--duration, 10s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          left: var(--x-start, 50vw);
          top: var(--y-start, 50vh);
        }

        .particle-light {
          background: radial-gradient(circle, rgba(159, 156, 191, 0.6) 0%, rgba(159, 156, 191, 0.1) 70%);
          box-shadow: 0 0 6px rgba(159, 156, 191, 0.3);
        }

        .particle-dark {
          background: radial-gradient(circle, rgba(193, 199, 209, 0.4) 0%, rgba(193, 199, 209, 0.1) 70%);
          box-shadow: 0 0 6px rgba(193, 199, 209, 0.2);
        }

        .particle-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            var(--line-color, rgba(159, 156, 191, 0.2)) 20%, 
            var(--line-color, rgba(159, 156, 191, 0.2)) 80%, 
            transparent 100%
          );
          transform-origin: left center;
          animation: drawLine var(--duration, 14s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          left: var(--start-x, 20%);
          top: var(--start-y, 20%);
        }

        .line-light {
          --line-color: rgba(159, 156, 191, 0.25);
        }

        .line-dark {
          --line-color: rgba(193, 199, 209, 0.15);
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(20px, -30px) scale(1.1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-15px, 20px) scale(0.9);
            opacity: 0.6;
          }
          75% {
            transform: translate(30px, 10px) scale(1.05);
            opacity: 0.7;
          }
        }

        @keyframes drawLine {
          0%, 100% {
            width: 0%;
            opacity: 0;
            transform: rotate(0deg);
          }
          20% {
            width: 100px;
            opacity: 0.3;
            transform: rotate(15deg);
          }
          50% {
            width: 150px;
            opacity: 0.6;
            transform: rotate(-10deg);
          }
          80% {
            width: 120px;
            opacity: 0.4;
            transform: rotate(5deg);
          }
        }

        /* 移动端优化 - 减少粒子数量 */
        @media (max-width: 768px) {
          .particle:nth-child(n+11) {
            display: none;
          }
          .particle-line:nth-child(n+5) {
            display: none;
          }
        }

        /* 减弱动画效果，节省电量 */
        @media (prefers-reduced-motion: reduce) {
          .particle, .particle-line {
            animation-duration: 20s;
            opacity: 0.3;
          }
        }

        /* 高性能设备增强效果 */
        @media (min-width: 1920px) and (min-height: 1080px) {
          .particle {
            box-shadow: 0 0 12px var(--glow-color, rgba(159, 156, 191, 0.4));
          }
        }
      `}</style>
    </div>
  )
}