export interface TaskAttributes {
  id?: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  assignedToId: string;
  ownerId: string;
  totalTime?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskUpdateAttributes {
  title?: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  assignedToId?: string;
  ownerId?: string;
  totalTime?: string
}
