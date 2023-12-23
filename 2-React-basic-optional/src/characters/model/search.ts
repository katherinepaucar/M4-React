export interface SearchForm {
  name: string;
}

export const createEmptyForm = (): SearchForm => ({
  name: "",
});

export type ErrorForms = Record<keyof SearchForm, string>;

export const createEmptyFormError = (): ErrorForms => ({
  name: "",
});
