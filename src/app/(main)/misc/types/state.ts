export interface StatesResponse {
    count: number;
    next?: null;
    previous?: null;
    results?: ResultsEntity[];
  }
  export interface ResultsEntity {
    id: number;
    state: string;
    created_at: string;
    updated_at: string;
  }
  