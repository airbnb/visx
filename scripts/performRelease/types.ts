export type PR = {
  id: number;
  number: number;
  title: string;
  html_url: string;
  labels: { name: string }[];
  user: { login: string };
};
