# Capability: Motor musical

## Contexto

Las operaciones puras (escalas, intervalos, acordes, rangos de notas, solfeo)
se encapsulan en `lib/music/*` como funciones deterministas sin dependencias
de DOM. Esto permite usarlas desde server actions (generacion de ejercicios)
y desde componentes cliente, manteniendo tests unitarios simples.

## Requisitos

### Solfeo espanol (`lib/music/solfege.ts`)

- `LETTER_TO_SOLFEGE_ES`: mapping C→Do, D→Re, E→Mi, F→Fa, G→Sol, A→La, B→Si.
- `pitchToSolfegeES("F#5") === "Fa#"`.
- `pitchToNaturalSolfegeES("E4") === "Mi"`.
- Lanza error con notas invalidas.

### Notas (`lib/music/notes.ts`, envolviendo Tonal.js)

- `midi("C4") === 60`.
- `naturalNotesInRange("C4","G4") === ["C4","D4","E4","F4","G4"]`.
- Rango invertido o invalido: throw con mensaje claro.

### Escalas / intervalos / acordes

- `scale.scaleNotes("C major")` devuelve `["C","D","E","F","G","A","B"]`.
- `intervals.between("C4","E4") === "3M"`.
- `intervals.semitonesBetween("C4","E4") === 4`.
- `chords.chordNotes("Cmaj7") === ["C","E","G","B"]`.

### RNG determinista (`lib/music/rng.ts`)

- `createRng(seed)` devuelve una funcion `() => number` en [0,1).
- Mismo seed → misma secuencia (usado para reproducir intentos).
- Helpers: `pick(arr, rng)`, `sampleWithout(arr, count, rng)`, `randomSeed()`.

## Criterios de aceptacion

- Todas las funciones anteriores tienen al menos un test unitario (Vitest).
- Ningun archivo de `lib/music/*` importa modulos de DOM, Tone, VexFlow o
  componentes React.
- Cambiar la version de Tonal.js solo debe requerir ajustes en `lib/music/*`,
  nunca en `lib/exercises` ni en componentes.
