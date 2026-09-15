const TILE = 28
const GAP = 4
const COLS = 8
const ROWS = 8

function tileRect(col: number, row: number) {
  return {
    x: col * (TILE + GAP),
    y: row * (TILE + GAP),
    width: TILE,
    height: TILE,
  }
}

export default function HeroSchematic() {
  const tiles: { col: number; row: number; fill: boolean }[] = []
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const inA = col < 4 && row < 4
      const inB = col >= 4 && row < 4
      const inC = col >= 4 && row >= 4
      const fill =
        (inA && col % 2 === row % 2) ||
        (inB && row === 1) ||
        (inC && col === 5)
      tiles.push({ col, row, fill })
    }
  }

  const width = COLS * TILE + (COLS - 1) * GAP
  const height = ROWS * TILE + (ROWS - 1) * GAP
  const viewH = height + 28

  return (
    <div className="hero-visual relative min-h-[42vh] lg:min-h-full" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full p-8 lg:p-12"
        viewBox={`0 0 ${width} ${viewH}`}
        fill="none"
        role="img"
      >
        <title>Tiled GEMM schematic</title>
        {tiles.map((tile) => {
          const rect = tileRect(tile.col, tile.row)
          return (
            <rect
              key={`${tile.col}-${tile.row}`}
              {...rect}
              stroke="var(--lime)"
              strokeOpacity={tile.fill ? 0.85 : 0.28}
              strokeWidth="1"
              fill={tile.fill ? 'var(--lime-dim)' : 'transparent'}
            />
          )
        })}
        <text
          x={TILE * 2}
          y={viewH - 6}
          fill="var(--lime)"
          fillOpacity="0.7"
          fontFamily="IBM Plex Mono, ui-monospace, monospace"
          fontSize="11"
        >
          C = A × B  tiled
        </text>
      </svg>
    </div>
  )
}
