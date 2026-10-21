export default function TempLine({ hours, isCelcius, colWidth, height }) {
  if (hours.length === 0) return null

  const pad = 8
  const temps = hours.map((h) => (isCelcius ? h.temp_c : h.temp_f))
  const min = Math.min(...temps)
  const max = Math.max(...temps)
  const range = max - min || 1

  const points = temps.map((t, i) => ({
    x: i * colWidth + colWidth / 2,
    y: pad + (1 - (t - min) / range) * (height - pad * 2),
  }))

  return (
    <svg
      className="tempLine"
      width={hours.length * colWidth}
      height={height}
    >
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke="#e8d9a0"
        strokeWidth="2"
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="white" />
      ))}
    </svg>
  )
}