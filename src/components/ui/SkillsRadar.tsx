'use client'

import { useEffect, useState } from 'react'
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import { cn } from '@/lib/utils'

/**
 * Skills Radar Chart
 * 
 * Interactive visualization of skills using a radar/spider chart
 * Shows skill proficiency levels in different areas
 */

interface SkillData {
  skill: string
  level: number // 0-100
  category?: string
}

interface SkillsRadarProps {
  skills: SkillData[]
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function SkillsRadar({ skills, className, size = 'md' }: SkillsRadarProps) {
  const [mounted, setMounted] = useState(false)
  const [colors, setColors] = useState({
    primary: '#3b82f6',
    border: '#374151',
    muted: '#6b7280',
  })

  useEffect(() => {
    setMounted(true)
    // Get computed CSS values
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)
    
    // Try to get actual primary color, fallback to blue
    const primaryColor = computedStyle.getPropertyValue('--primary-500').trim() || '#3b82f6'
    const borderColor = computedStyle.getPropertyValue('--border').trim() || '#374151'
    const mutedColor = computedStyle.getPropertyValue('--muted').trim() || '#6b7280'
    
    setColors({
      primary: primaryColor.startsWith('#') ? primaryColor : '#3b82f6',
      border: borderColor.startsWith('#') ? borderColor : '#374151',
      muted: mutedColor.startsWith('#') ? mutedColor : '#6b7280',
    })
  }, [])

  const heights = {
    sm: 250,
    md: 350,
    lg: 450,
  }

  if (!mounted) {
    return (
      <div className={cn('p-6', className)}>
        <div 
          className="flex items-center justify-center bg-[var(--card-hover)] rounded animate-pulse"
          style={{ height: heights[size] }}
        >
          <span className="text-[var(--muted)]">Loading chart...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('p-2', className)}>
      <ResponsiveContainer width="100%" height={heights[size]}>
        <RadarChart data={skills} cx="50%" cy="50%" outerRadius="80%">
          <PolarGrid 
            stroke="#6b7280"
            gridType="polygon"
          />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ 
              fill: '#9ca3af', 
              fontSize: size === 'sm' ? 10 : 12 
            }}
          />
          <Radar
            name="Skills"
            dataKey="level"
            stroke="#06b6d4"
            fill="#06b6d4"
            fillOpacity={0.5}
            strokeWidth={2}
            dot={{ r: 4, fill: '#06b6d4', stroke: '#fff', strokeWidth: 1 }}
            activeDot={{ r: 6, fill: '#22d3ee', stroke: '#fff', strokeWidth: 2 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload as SkillData
                return (
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-2 shadow-lg">
                    <p className="font-medium">{data.skill}</p>
                    <p className="text-sm text-[var(--muted)]">
                      Proficiency: {data.level}%
                    </p>
                    {data.category && (
                      <p className="text-xs text-primary-500">{data.category}</p>
                    )}
                  </div>
                )
              }
              return null
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

// Default ML/Data Science skills for the portfolio
export const defaultMLSkills: SkillData[] = [
  { skill: 'Python', level: 90, category: 'Programming' },
  { skill: 'ML Algorithms', level: 85, category: 'Machine Learning' },
  { skill: 'Data Analysis', level: 88, category: 'Data Science' },
  { skill: 'Deep Learning', level: 70, category: 'Machine Learning' },
  { skill: 'SQL', level: 80, category: 'Data' },
  { skill: 'Feature Engineering', level: 82, category: 'ML Pipeline' },
  { skill: 'Model Evaluation', level: 85, category: 'Machine Learning' },
  { skill: 'Data Visualization', level: 78, category: 'Data Science' },
]
