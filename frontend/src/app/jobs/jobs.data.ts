export type Modality = 'Remoto' | 'Presencial' | 'Híbrido';

export interface Job {
  readonly id: number;
  readonly title: string;
  readonly company: string;
  readonly location: string;
  readonly modality: Modality;
  readonly description: string;
}

/** Registros exclusivamente demonstrativos; não são anúncios reais de contratação. */
export const DEMO_JOBS: readonly Job[] = [
  { id: 1, title: 'Assistente de Atendimento', company: 'Empresa Exemplo A', location: 'Brasil', modality: 'Remoto', description: 'Atendimento ao público por canais digitais.' },
  { id: 2, title: 'Analista de Atendimento Júnior', company: 'Empresa Exemplo B', location: 'São Paulo, SP', modality: 'Remoto', description: 'Organização e acompanhamento de solicitações.' },
  { id: 3, title: 'Auxiliar Administrativo', company: 'Empresa Exemplo C', location: 'Guarulhos, SP', modality: 'Presencial', description: 'Apoio a rotinas administrativas.' },
  { id: 4, title: 'Atendente de Suporte', company: 'Empresa Exemplo D', location: 'São Paulo, SP', modality: 'Híbrido', description: 'Orientação inicial e registro de chamados.' },
];

/** Qualquer modalidade externa não reconhecida deve ser rejeitada. */
export function isModality(value: string): value is Modality | '' {
  return value === '' || value === 'Remoto' || value === 'Presencial' || value === 'Híbrido';
}

export function filterJobs(jobs: readonly Job[], keyword: string, modality: string): Job[] {
  if (!isModality(modality)) {
    throw new Error('Modalidade inválida');
  }
  const normalized = keyword.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  return jobs.filter(job => {
    const searchable = [job.title, job.company, job.description].join(' ')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
    return (!normalized || searchable.includes(normalized)) && (!modality || job.modality === modality);
  });
}
