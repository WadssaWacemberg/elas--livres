import test from 'node:test';
import assert from 'node:assert/strict';
import { DEMO_JOBS, filterJobs, isModality } from '../src/app/jobs/jobs.data.ts';

test('busca Atendimento Remoto: encontra duas vagas demonstrativas', () => {
  const result = filterJobs(DEMO_JOBS, 'Atendimento', 'Remoto');
  assert.equal(result.length, 2);
  assert.ok(result.every(job => job.modality === 'Remoto'));
});
test('busca sem correspondência retorna lista vazia', () => {
  assert.deepEqual(filterJobs(DEMO_JOBS, 'vagas-inexistentes', 'Remoto'), []);
});
test('filtro inválido rejeitado', () => {
  assert.equal(isModality('Outro'), false);
  assert.throws(() => filterJobs(DEMO_JOBS, 'Atendimento', 'Outro'), /Modalidade inválida/);
});
test('busca aceita variações de acento e maiúsculas', () => {
  assert.equal(filterJobs(DEMO_JOBS, 'ADMINISTRATIVO', 'Presencial').length, 1);
});
test('filtro presencial retorna apenas presencial', () => {
  assert.deepEqual(filterJobs(DEMO_JOBS, '', 'Presencial').map(j => j.id), [3]);
});
test('busca vazia sem modalidade retorna o catálogo', () => {
  assert.equal(filterJobs(DEMO_JOBS, '  ', '').length, DEMO_JOBS.length);
});
