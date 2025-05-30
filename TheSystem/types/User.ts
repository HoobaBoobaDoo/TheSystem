export type User = {
  username: string;
  fullName: string;
  email: string;
  password: string;
  rank: string;
  class: string;
  tags: string[];
  todos: string[];
  level: number;
  profilePicture?: string;
  productivity?: string[];
  weeklies?: {
    name: string;
    tasks: {
      label: string;
      done?: boolean;
    }[];
  }[];
  stats: {
    steps: number;
    pushups: number;
    dungeonTime: number;
    planking: number;
  };
};
