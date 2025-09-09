import { ProjectConfig } from './config.types'
import { ProjectConfigHyperChonk } from './projects/hyperchonk'

export const allProjects: Record<string, ProjectConfig> = {
  [ProjectConfigHyperChonk.projectId]: ProjectConfigHyperChonk,
}

export const isHyperChonk = process.env.NEXT_PUBLIC_PROJECT_ID === ProjectConfigHyperChonk.projectId

export const PROJECT_CONFIG = process.env.NEXT_PUBLIC_PROJECT_ID
  ? allProjects[process.env.NEXT_PUBLIC_PROJECT_ID]
  : ProjectConfigHyperChonk
