import { describe, it, expect } from 'vitest';
import { validateRewriteInput } from '@/lib/rewrite';

describe('validateRewriteInput', () => {
  const base = {
    job_description: 'A'.repeat(100),
    resume_bullets: ['Did X', 'Built Y'],
    params: {},
  };

  it('passes for valid input', () => {
    expect(() => validateRewriteInput(base)).not.toThrow();
  });

  it('fails when JD is empty', () => {
    expect(() =>
      validateRewriteInput({ ...base, job_description: '' })
    ).toThrow(/Job description is required/);
  });

  it('fails when JD exceeds 10KB', () => {
    expect(() =>
      validateRewriteInput({ ...base, job_description: 'A'.repeat(10001) })
    ).toThrow(/exceeds 10KB/);
  });

  it('fails when no bullets', () => {
    expect(() => validateRewriteInput({ ...base, resume_bullets: [] })).toThrow(/at least one/);
  });

  it('fails when >50 bullets', () => {
    expect(() =>
      validateRewriteInput({ ...base, resume_bullets: new Array(51).fill('x') })
    ).toThrow(/max 50/);
  });

  it('enforces max_words_per_bullet bounds', () => {
    expect(() =>
      validateRewriteInput({ ...base, params: { max_words_per_bullet: 5 } })
    ).toThrow(/between 6 and 60/);
    expect(() =>
      validateRewriteInput({ ...base, params: { max_words_per_bullet: 61 } })
    ).toThrow(/between 6 and 60/);
    expect(() =>
      validateRewriteInput({ ...base, params: { max_words_per_bullet: 26 } })
    ).not.toThrow();
  });

  it('validates target_tense enum', () => {
    expect(() =>
      validateRewriteInput({ ...base, params: { target_tense: 'auto' } })
    ).not.toThrow();
    expect(() =>
      validateRewriteInput({ ...base, params: { target_tense: 'future' as any } })
    ).toThrow(/target_tense/);
  });

  it('validates seniority_hint enum', () => {
    expect(() =>
      validateRewriteInput({ ...base, params: { seniority_hint: 'IC mid' } })
    ).not.toThrow();
    expect(() =>
      validateRewriteInput({ ...base, params: { seniority_hint: 'Senior IC' as any } })
    ).toThrow(/seniority_hint/);
  });
});


